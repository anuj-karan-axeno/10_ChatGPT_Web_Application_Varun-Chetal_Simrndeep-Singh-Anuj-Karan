import { mockConversations } from '../constant/mockConvoData.js';
import { getConversationGroup } from '../utils/dateGroup.js'
import { createSidebarItem } from '../components/sidebar_items.js'
import { AppIcon } from '../utils/app_icon.js';

let sidebarEl;
let collapseBtn;
let navEl;
let headerActionsEl;
let mainActionsEl;
let compactActionsEl;


const GROUP_ORDER = ["Today", "Yesterday", "Previous 7 days", "Older"];
const MAIN_ACTIONS = [
    { icon: 'new_chat', label: 'New Chat' },
    { icon: 'images', label: 'Images' },
    { icon: 'library', label: 'Library' },
    { icon: 'plug', label: 'Plugins' },
    { icon: 'folder', label: 'Projects' },
    { icon: 'horizontal_3_dots', label: 'More' },
];
const COMPACT_ACTIONS = [
    { icon: 'new_chat', label: 'New chat' },
    { icon: 'search', label: 'Search conversations' },
    { icon: 'pin', label: 'Pinned conversations' },
    { icon: 'message_circle', label: 'Conversation history' },
];
export function initSidebar() {

    sidebarEl = document.querySelector('.sidebar');
    navEl = document.querySelector('.sidebar__nav');
    headerActionsEl = document.querySelector('.sidebar__header-actions');
    mainActionsEl = document.querySelector('.sidebar__main-action');
    compactActionsEl = document.querySelector('.sidebar__compact-actions');
    collapseBtn = document.querySelector('.sidebar__collapse-btn');

    renderHeaderActions()
    renderMainActions()
    renderCompactActions()
    renderConversationGroups(mockConversations)

    bindEvents();
}

function bindEvents() {
    collapseBtn.addEventListener('click', toggleCollapse);

}

function renderHeaderActions() {
    headerActionsEl.innerHTML = `
        <button class="sidebar__icon-btn  sidebar__search-btn" aria-label="Search conversations">
                ${AppIcon({ iconName: 'search' })}
        </button>
        <button class="sidebar__icon-btn sidebar__collapse-btn" aria-label="Collapse sidebar"  aria-expanded="true">
                ${AppIcon({ iconName: 'collapse' })}
        </button>
    `;
    collapseBtn = headerActionsEl.querySelector('.sidebar__collapse-btn');
}

function renderMainActions() {
    mainActionsEl.innerHTML = `
            ${MAIN_ACTIONS.map(({ icon, label }) => `
                     <li class="sidebar__item">
                     ${AppIcon({ iconName: icon })}
                        <span class="sidebar__chat-title">${label}</span>
                    </li>
            `).join('')}
        
    `;
}

function renderCompactActions() {
    compactActionsEl.innerHTML = `
       
            ${COMPACT_ACTIONS.map(({ icon, label }) => `
             <li>
                 <button type="button" class="sidebar__compact-action" aria-label="New chat">
                      ${AppIcon({ iconName: icon })}
                    </button>
            </li>
            `).join('')}
       
    `;
}
function groupByDate(conversations) {
    const groups = { "Today": [], "Yesterday": [], "Previous 7 days": [], "Older": [] };
    conversations.forEach((convo) => {
        groups[getConversationGroup(convo.date)].push(convo);
    });
    return groups;
}
function renderConversationGroups(conversations) {
    const groups = groupByDate(conversations);

    navEl.innerHTML = '';

    GROUP_ORDER.forEach((groupName) => {
        const items = groups[groupName];
        if (items.length === 0) return;

        navEl.appendChild(buildGroupElement(groupName, items));
    });
}

function buildGroupElement(groupName, items) {
    const groupEl = document.createElement('div');
    groupEl.className = 'sidebar__group';

    const groupHeader = buildGroupHeader(groupName);

    const listEl = document.createElement('ul');
    listEl.className = 'sidebar__list';
    items.forEach((convo) => listEl.appendChild(createSidebarItem(convo)));

    groupEl.append(groupHeader, listEl);

    const groupToggle = groupHeader.querySelector('.sidebar__group-toggle');
    groupToggle.addEventListener('click', () => toggleGroup(groupEl, listEl, groupToggle));

    return groupEl;
}

function buildGroupHeader(groupName) {
    const headerEl = document.createElement('div');
    headerEl.className = 'sidebar__group-header';
    headerEl.innerHTML = `
        <button class="sidebar__group-toggle" type="button" aria-expanded="true">
            <span class="sidebar__group-title">${groupName}</span>
            <span class="sidebar__group-toggle-icon">
                ${AppIcon({ iconName: 'chevron_down', strokeWidth: 1.5 })}
            </span>
        </button>
        <div class="sidebar__group-header__actions">
            <button class="sidebar__group-action" type="button" aria-label="New chat">
                ${AppIcon({ iconName: 'new_chat', strokeWidth: 1.5 })}
            </button>
            <button class="sidebar__group-action" type="button" aria-label="More group options">
                ${AppIcon({ iconName: 'horizontal_3_dots', strokeWidth: 1.5 })}
            </button>
        </div>
    `;
    return headerEl;
}

function toggleGroup(groupEl, listEl, groupToggle) {
    listEl.hidden = !listEl.hidden;
    groupEl.classList.toggle('sidebar__group--collapsed', listEl.hidden);
    groupToggle.setAttribute('aria-expanded', String(!listEl.hidden));
}


function toggleCollapse() {
    const isCollapsed = sidebarEl.classList.toggle('sidebar--collapsed');
    collapseBtn.setAttribute('aria-expanded', String(!isCollapsed));
    collapseBtn.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
}
