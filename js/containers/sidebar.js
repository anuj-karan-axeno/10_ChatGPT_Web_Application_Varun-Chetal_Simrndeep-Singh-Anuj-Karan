import { getConversationGroup } from '../utils/dateGroup.js'
import { createSidebarItem } from '../components/sidebar_items.js'
import { openSearchModal } from '../components/search_modal.js';
import { AppIcon } from '../utils/app_icon.js';
import {renderSidebarFooterMenu} from '../components/sidebar_footer.js'

let sidebarEl;
let collapseBtn;
let navEl;
let headerActionsEl;
let mainActionsEl;
let compactActionsEl;
let onConversationSelect;
let onNewChat;
let conversations;


const MAIN_ACTIONS = [
    { icon: 'new_chat', label: 'New Chat' },
    { icon: 'images', label: 'Images' },
    { icon: 'library', label: 'Library' },
    { icon: 'plug', label: 'Plugins' },
    { icon: 'folder', label: 'Projects' },
    { icon: 'horizontal_3_dots', label: 'More' },
];
const COMPACT_ACTIONS = [
    { icon: 'new_chat', label: 'New chat', action: 'new-chat' },
    { icon: 'search', label: 'Search conversations', action: 'search' },
    { icon: 'pin', label: 'Pinned conversations' },
    { icon: 'message_circle', label: 'Conversation history' },
];
export function initSidebar(callbacks = {}) {
    onConversationSelect = callbacks.onConversationSelect;
    onNewChat = callbacks.onNewChat;
    conversations = callbacks.conversations;

    sidebarEl = document.querySelector('.sidebar');
    navEl = document.querySelector('.sidebar__nav');
    headerActionsEl = document.querySelector('.sidebar__header-actions');
    mainActionsEl = document.querySelector('.sidebar__main-action');
    compactActionsEl = document.querySelector('.sidebar__compact-actions');
    collapseBtn = document.querySelector('.sidebar__collapse-btn');

    renderHeaderActions()
    renderMainActions()
    renderCompactActions()
    renderConversationGroups(conversations)
    renderSidebarFooterMenu()

    bindEvents();
}

function bindEvents() {
    collapseBtn.addEventListener('click', toggleCollapse);
    headerActionsEl.querySelector('.sidebar__search-btn').addEventListener('click', openSearch);
    headerActionsEl.querySelector('.sidebar__mobile-close-btn').addEventListener('click', closeMobileSidebar);
    compactActionsEl.querySelector('.sidebar__compact-action--search').addEventListener('click', openSearch);
    mainActionsEl.addEventListener('click', handleNewChatClick);
    compactActionsEl.addEventListener('click', handleNewChatClick);

}

function closeMobileSidebar() {
    sidebarEl.classList.remove('sidebar--mobile-open');
    document.querySelector('.sidebar-backdrop').classList.remove('sidebar-backdrop--visible');
}

function openSearch() {
    openSearchModal(conversations, selectConversation);
}

function handleNewChatClick(event) {
    if (!event.target.closest('[data-action="new-chat"]')) return;

    clearSelectedConversation();
    onNewChat?.();
}

function renderHeaderActions() {
    headerActionsEl.innerHTML = `
        <button class="sidebar__icon-btn  sidebar__search-btn" aria-label="Search conversations">
                ${AppIcon({ iconName: 'search' })}
        </button>
        <button class="sidebar__icon-btn sidebar__collapse-btn" aria-label="Collapse sidebar"  aria-expanded="true">
                ${AppIcon({ iconName: 'collapse' })}
        </button>
        <button class="sidebar__icon-btn sidebar__mobile-close-btn" type="button" aria-label="Close sidebar">
                ${AppIcon({ iconName: 'x' })}
        </button>
    `;
    collapseBtn = headerActionsEl.querySelector('.sidebar__collapse-btn');
}

function renderMainActions() {
    mainActionsEl.innerHTML = `
            ${MAIN_ACTIONS.map(({ icon, label }) => `
                     <li class="sidebar__item" ${label === 'New Chat' ? 'data-action="new-chat"' : ''}>
                     ${AppIcon({ iconName: icon })}
                        <span class="sidebar__chat-title">${label}</span>
                    </li>
            `).join('')}
        
    `;
}

function renderCompactActions() {
    compactActionsEl.innerHTML = `
       
            ${COMPACT_ACTIONS.map(({ icon, label, action }) => `
             <li>
                 <button type="button" class="sidebar__compact-action${action ? ` sidebar__compact-action--${action}` : ''}" aria-label="${label}" ${action === 'new-chat' ? 'data-action="new-chat"' : ''}>
                      ${AppIcon({ iconName: icon })}
                    </button>
            </li>
            `).join('')}
       
    `;
}
export function renderConversationGroups(conversations, selectedChatId) {
    const groups = {
        Today: [],
        Yesterday: [],
        "Previous 7 days": [],
        Older: [],
    };

    conversations.forEach((conversation) => {
        const groupName = getConversationGroup(conversation.date);
        groups[groupName].push(conversation);
    });

    document.querySelectorAll('.sidebar__chat-menu').forEach((menu) => menu.remove());
    navEl.innerHTML = '';

    Object.entries(groups).forEach(([groupName, items]) => {
        if (items.length === 0) return;

        navEl.appendChild(buildGroupElement(groupName, items));
    });

    if (selectedChatId) {
        navEl.querySelector(`[data-conversation-id="${selectedChatId}"]`)
            ?.classList.add('sidebar__item--active');
    }
}

function buildGroupElement(groupName, items) {
    const groupEl = document.createElement('div');
    groupEl.className = 'sidebar__group';

    const groupHeader = buildGroupHeader(groupName);

    const listEl = document.createElement('ul');
    listEl.className = 'sidebar__list';
    items.forEach((convo) => listEl.appendChild(createSidebarItem(convo, selectConversation)));

    groupEl.append(groupHeader, listEl);

    const groupToggle = groupHeader.querySelector('.sidebar__group-toggle');
    groupToggle.addEventListener('click', () => toggleGroup(groupEl, listEl, groupToggle));

    groupHeader.querySelector('[data-action="new-chat"]')
        .addEventListener('click', handleNewChatClick);

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
            <button class="sidebar__group-action" type="button" aria-label="New chat" data-action="new-chat">
                ${AppIcon({ iconName: 'new_chat', strokeWidth: 1.5 })}
            </button>
            <button class="sidebar__group-action" type="button" aria-label="More group options">
                ${AppIcon({ iconName: 'horizontal_3_dots', strokeWidth: 1.5 })}
            </button>
        </div>
    `;
    return headerEl;
}

function selectConversation(conversation) {
    clearSelectedConversation();
    navEl.querySelector(`[data-conversation-id="${conversation.id}"]`)
        ?.classList.add('sidebar__item--active');
    onConversationSelect?.(conversation);
}

function clearSelectedConversation() {
    const active_sidebar_item = navEl.querySelector('.sidebar__item--active')
    active_sidebar_item?.classList.remove('sidebar__item--active');
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
