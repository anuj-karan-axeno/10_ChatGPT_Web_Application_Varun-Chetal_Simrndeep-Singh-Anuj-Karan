import { initComposer, setComposerGenerating } from '../components/composer.js';
import { createLoadingMessage, createMessages } from '../components/messages.js';
import { showNewChat as renderNewChat } from '../components/new_chat.js';
import { AppIcon } from '../utils/app_icon.js';

let chatEl;
let chatContentEl;
let composerEl;
let shareButton;

export function initChat(callbacks = {}) {
    chatEl = document.querySelector('.chat');

    if (!chatEl) return;

    chatEl.innerHTML = `
        <header class="chat__header">
            <div class="chat__mobile-navigation">
                <button class="chat__menu-button" type="button" aria-label="Open sidebar">
                   
                ${AppIcon({ iconName: 'hamburger', size: 20})}
                </button>

                <button class="chat__model-button" type="button" aria-label="Choose model">
                    <span>ChatGPT</span>
                    ${AppIcon({ iconName: 'chevron_down', size: 14})}
                </button>
            </div>

            <div class="chat__header-actions">
                <button class="chat__upgrade-button" type="button">
                    ${AppIcon({ iconName: 'star', size: 20, strokeWidth:2 })}
                    <span>Upgrade</span>
                </button>

                <button class="chat__share-button" type="button" aria-label="Copy chat link" hidden>
                    ${AppIcon({ iconName: 'share', size: 20, strokeWidth:2 })}
                    <span class="chat__share-text">Share</span>
                </button>
                    
                    <button class="chat__account-button" type="button" aria-label="Open account menu">
                    ${AppIcon({ iconName: 'message_circle_dashed', size: 20, strokeWidth:2 })}
                   
                </button>
            </div>
        </header>

        <section class="chat__content" aria-label="Conversation"></section>
        <form class="composer" aria-label="Message composer"></form>
    `;

    initComposer({ onSendMessage: callbacks.onSendMessage });

    chatContentEl = chatEl.querySelector('.chat__content');
    composerEl = chatEl.querySelector('.composer');
    shareButton = chatEl.querySelector('.chat__share-button');

    chatEl.querySelector('.chat__menu-button').addEventListener('click', toggleMobileSidebar);
    document.querySelector('.sidebar-backdrop').addEventListener('click', toggleMobileSidebar);

    shareButton.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
    });

    showNewChat();
}

function toggleMobileSidebar() {
    document.querySelector('.sidebar').classList.toggle('sidebar--mobile-open');
    document.querySelector('.sidebar-backdrop').classList.toggle('sidebar-backdrop--visible');
}

export function showNewChat() {
    if (!chatContentEl || !composerEl) return;

    shareButton.hidden = true;
    chatContentEl.classList.add('chat__content--welcome');
    renderNewChat(chatContentEl, composerEl);
}

export function renderChatMessages(messages, isGenerating = false) {
    if (!chatContentEl || !composerEl) return;

    shareButton.hidden = false;
    // Put the composer back at the bottom before clearing the welcome screen.
    chatEl.append(composerEl);
    chatContentEl.classList.remove('chat__content--welcome');

    const messagesEl = createMessages(messages);

    if (isGenerating) {
        messagesEl.append(createLoadingMessage());
    }

    chatContentEl.replaceChildren(messagesEl);
    setComposerGenerating(isGenerating);
    chatContentEl.scrollTop = chatContentEl.scrollHeight;
}
