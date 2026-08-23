import { AppIcon } from '../utils/app_icon.js';

export function openSearchModal(conversations, onConversationSelect) {
    const modalContainer = document.querySelector('.search-modal-container');
    if (!modalContainer) return;

    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal__dialog" role="dialog" aria-modal="true" aria-label="Search chats">
            <div class="search-modal__input-row">
                <input class="search-modal__input" type="search" placeholder="Search chats..." aria-label="Search chats">
                <button class="search-modal__close-button" type="button" aria-label="Close search">
                    ${AppIcon({ iconName: 'x', size: 20 })}
                </button>
            </div>
            <p class="search-modal__title">Recent chats</p>
            <div class="search-modal__results"></div>
        </div>
    `;

    const input = modal.querySelector('.search-modal__input');
    const title = modal.querySelector('.search-modal__title');
    const results = modal.querySelector('.search-modal__results');

    function closeModal() {
        modal.remove();
    }

    function showResults(chats) {
        results.innerHTML = '';

        chats.forEach((chat) => {
            const chatButton = document.createElement('button');
            chatButton.className = 'search-modal__result';
            chatButton.type = 'button';
            chatButton.innerHTML = `${AppIcon({ iconName: 'message_circle', size: 20 })}<span class="search-modal__result-title"></span>`;
            chatButton.querySelector('.search-modal__result-title').textContent = chat.chat_title;

            chatButton.addEventListener('click', () => {
                closeModal();
                onConversationSelect(chat);
            });

            results.append(chatButton);
        });
    }

    input.addEventListener('input', () => {
        const searchText = input.value.toLowerCase();
        const matchingChats = conversations.filter((chat) => chat.chat_title.toLowerCase().includes(searchText));
        title.textContent = searchText ? 'Search results' : 'Recent chats';
        showResults(matchingChats);
    });

    modal.querySelector('.search-modal__close-button').addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    showResults(conversations);
    modalContainer.append(modal);
    input.focus();
}
