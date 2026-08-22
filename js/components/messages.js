import { AppIcon } from '../utils/app_icon.js';

const MESSAGE_ACTIONS = {
    user: [
        { name: 'copy', label: 'Copy message', icon: 'copy' },
        { name: 'share', label: 'Share message', icon: 'share' },
        { name: 'edit', label: 'Edit message', icon: 'pen' },
    ],
    assistant: [
        { name: 'copy', label: 'Copy response', icon: 'copy' },
        { name: 'thumbs-up', label: 'Good response', icon: 'thumbs_up' },
        { name: 'thumbs-down', label: 'Bad response', icon: 'thumbs_down' },
        { name: 'share', label: 'Share response', icon: 'share' },
        { name: 'regenerate', label: 'Regenerate response', icon: 'refresh' },
        { name: 'more', label: 'More response options', icon: 'horizontal_3_dots' },
    ],
};

export function createMessages(messages) {
    const messagesEl = document.createElement('section');
    messagesEl.className = 'chat__messages';
    messagesEl.setAttribute('aria-label', 'Conversation messages');

    messages.forEach(({ role, content }) => {
        const messageWrapperEl = document.createElement('article');
        messageWrapperEl.className = `chat__message-wrapper chat__message-wrapper--${role}`;

        const messageEl = document.createElement('div');
        messageEl.className = `chat__message chat__message--${role}`;

        const messageContentEl = document.createElement('div');
        messageContentEl.className = 'chat__message-content';
        messageContentEl.textContent = content;
        messageEl.append(messageContentEl);

        const actionsEl = document.createElement('div');
        actionsEl.className = `chat__message-actions chat__message-actions--${role}`;
        actionsEl.setAttribute('aria-label', role === 'user' ? 'Message actions' : 'Response actions');

        MESSAGE_ACTIONS[role].forEach((action) => {
            const button = document.createElement('button');
            button.className = `chat__message-action chat__message-action--${action.name}`;
            button.type = 'button';
            button.setAttribute('aria-label', action.label);
            button.dataset.tooltip = action.label;
            button.innerHTML = AppIcon({ iconName: action.icon, size:16 });
            actionsEl.append(button);
        });

        const copyLabel = role === 'user' ? 'Copy message' : 'Copy response';

        const copyButton = actionsEl.querySelector('.chat__message-action--copy');
        copyButton.addEventListener('click', async () => {
            await navigator.clipboard.writeText(content);
            copyButton.innerHTML = AppIcon({ iconName: 'check',  size:16});
            copyButton.setAttribute('aria-label', 'Copied');
            copyButton.dataset.tooltip = 'Copied';

            setTimeout(() => {
                copyButton.innerHTML = AppIcon({ iconName: 'copy', size:16 });
                copyButton.setAttribute('aria-label', copyLabel);
                copyButton.dataset.tooltip = copyLabel;
            }, 1000);
        });

        messageWrapperEl.append(messageEl, actionsEl);
        messagesEl.append(messageWrapperEl);
    });

    setTimeout(() => {
        messagesEl.querySelectorAll('.chat__message--user').forEach((messageEl) => {
            const messageContentEl = messageEl.querySelector('.chat__message-content');

            if (messageContentEl.scrollHeight <= messageContentEl.clientHeight) return;

            const showMoreButton = document.createElement('button');
            showMoreButton.className = 'chat__message-show-more';
            showMoreButton.type = 'button';
            showMoreButton.innerHTML = `Show more ${AppIcon({ iconName: 'chevron_down' })}`;
            showMoreButton.setAttribute('aria-expanded', 'false');

            showMoreButton.addEventListener('click', () => {
                const isExpanded = messageEl.classList.toggle('chat__message--expanded');
                showMoreButton.classList.toggle('chat__message-show-more--expanded', isExpanded);
                showMoreButton.setAttribute('aria-expanded', String(isExpanded));
                showMoreButton.innerHTML = isExpanded
                    ? `Show less ${AppIcon({ iconName: 'chevron_up' })}`
                    : `Show more ${AppIcon({ iconName: 'chevron_down' })}`;
            });

            messageEl.append(showMoreButton);
        });
    }, 0);

    return messagesEl;
}
