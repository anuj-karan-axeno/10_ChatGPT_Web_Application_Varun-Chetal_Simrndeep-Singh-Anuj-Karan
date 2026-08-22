import { initComposer } from '../components/composer.js';
import { createMessages } from '../components/messages.js';
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

    shareButton.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href);
    });

    showNewChat();
}

// Shows the first screen before the user opens a conversation.
export function showNewChat() {
    if (!chatContentEl || !composerEl) return;

    shareButton.hidden = true;
    chatContentEl.classList.add('chat__content--welcome');
    chatContentEl.innerHTML = `
        <div class="chat__welcome">
        <div></div>
            <h1 class="chat__welcome__text">Ready when you are.</h1>
        </div>
    `;

    // New Chat keeps the welcome text and composer together in the center.
    chatContentEl.querySelector('.chat__welcome').append(composerEl);
}

// Call this when a conversation is selected from the sidebar.
export function renderChatMessages(messages) {
    if (!chatContentEl || !composerEl) return;

    shareButton.hidden = false;
    // Put the composer back at the bottom before clearing the welcome screen.
    chatEl.append(composerEl);
    chatContentEl.classList.remove('chat__content--welcome');

    chatContentEl.replaceChildren(createMessages(messages));
}
