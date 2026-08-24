import { AppIcon } from '../utils/app_icon.js';

const SUGGESTED_PROMPTS = [
    'Help me plan a weekend trip',
    'Explain a JavaScript concept simply',
    'Give me ideas for a healthy dinner',
];

export function showNewChat(chatContentEl, composerEl) {
    const newChatEl = document.createElement('div');
    newChatEl.className = 'new-chat';
    newChatEl.innerHTML = `
        <h1 class="new-chat__title">Ready when you are.</h1>

        <div class="new-chat__bottom">
            <div class="new-chat__composer"></div>

            <div class="new-chat__suggestions" aria-label="Suggested prompts">
                ${SUGGESTED_PROMPTS.map((prompt) => `
                    <button class="new-chat__suggestion" type="button">
                        <span class="new-chat__suggestion-icon">
                            ${AppIcon({ iconName: 'message_circle', size: 18 })}
                        </span>
                        <span class="new-chat__suggestion-text">${prompt}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    newChatEl.querySelector('.new-chat__composer').append(composerEl);
    chatContentEl.replaceChildren(newChatEl);
}
