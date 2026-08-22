import { AppIcon } from "../utils/app_icon.js";
let activeMenu;
let repositionFrame;

function closeActiveMenu() {
    if (!activeMenu) return;

    activeMenu.menu.hidden = true;
    activeMenu.button.setAttribute('aria-expanded', 'false');
    activeMenu = undefined;
}

function positionActiveMenu() {
    repositionFrame = undefined;
    if (!activeMenu) return;

    const { button, menu } = activeMenu;
    const buttonRect = button.getBoundingClientRect();

    const gap = 8;
    const preferredLeft = buttonRect.right + gap;
    const preferredTop = buttonRect.top;

    menu.style.left = `${Math.max(gap, Math.min(preferredLeft, window.innerWidth - menu.offsetWidth - gap))}px`;
    menu.style.top = `${Math.max(gap, Math.min(preferredTop, window.innerHeight - menu.offsetHeight - gap))}px`;
}

function scheduleMenuPosition() {
    if (!activeMenu || repositionFrame) return;
    repositionFrame = requestAnimationFrame(positionActiveMenu);
}

function openMenu(menu, button) {
    if (activeMenu?.menu === menu) {
        closeActiveMenu();
        return;
    }

    closeActiveMenu();
    menu.hidden = false;
    activeMenu = { menu, button };
    positionActiveMenu();
    button.setAttribute('aria-expanded', 'true');
}

document.addEventListener('scroll', scheduleMenuPosition, true);
window.addEventListener('resize', scheduleMenuPosition);

document.addEventListener('click', (event) => {
    if (activeMenu && !activeMenu.menu.contains(event.target) && !activeMenu.button.contains(event.target)) {
        closeActiveMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeActiveMenu();
});

export function createSidebarItem(convo, onConversationSelect) {
    const listItem = document.createElement('li');
    listItem.classList.add('sidebar__item');
    listItem.dataset.conversationId = convo.id;

    listItem.innerHTML = `
           <span class="sidebar__chat-title">${convo.chat_title}</span>
                            <div class="sidebar__item-actions">
                                <button class="sidebar__pin-btn" aria-label="Pin conversation" aria-pressed="false">
                                    ${AppIcon({ iconName: 'pin', strokeWidth: 1.2 })}
                                </button>
                                <button class="sidebar__more-btn" aria-label="More options for ${convo.chat_title}"
                                    aria-haspopup="true" aria-controls="sidebar-menu-${convo.id}" aria-expanded="false">
                                   ${AppIcon({ iconName: 'horizontal_3_dots', strokeWidth: 1.2 })}
                                </button>

                                <ul class="sidebar__chat-menu" id="sidebar-menu-${convo.id}" hidden>
                                    <li class="sidebar__chat-menu-item">
                                        <button type="button" class="sidebar__chat-menu-button">
                                            <span class="sidebar__chat-menu-icon">${AppIcon({ iconName: 'share' })}</span>
                                            <span class="sidebar__chat-menu-label">Share</span>
                                        </button>
                                    </li>
                                    <li class="sidebar__chat-menu-item">
                                        <button type="button" class="sidebar__chat-menu-button">
                                            <span class="sidebar__chat-menu-icon">${AppIcon({ iconName: 'pen' })}</span>
                                            <span class="sidebar__chat-menu-label">Rename</span>
                                        </button>
                                    </li>
                                    <li class="sidebar__chat-menu-item sidebar__chat-menu-item--delete">
                                        <button type="button" class="sidebar__chat-menu-button sidebar__chat-menu-button--delete">
                                            <span class="sidebar__chat-menu-icon">${AppIcon({ iconName: 'trash' })}</span>
                                            <span class="sidebar__chat-menu-label">Delete</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
    
    `

    const moreButton = listItem.querySelector('.sidebar__more-btn');
    const menu = listItem.querySelector('.sidebar__chat-menu');

    // A menu inside .sidebar is clipped by its vertical scrolling overflow.
    // Moving it to body lets it extend into the chat area.
    document.body.appendChild(menu);

    moreButton.addEventListener('click', (event) => {
        event.stopPropagation();
        openMenu(menu, moreButton);
    });

    listItem.addEventListener('click', (event) => {
        if (event.target.closest('button')) return;
        onConversationSelect(convo);
    });

    return listItem;
}
