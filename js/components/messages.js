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

function addAssistantBlocks(messageContentEl, blocks) {
    blocks.forEach((block) => {
        if (block.type === 'paragraph') {
            const paragraph = document.createElement('p');
            paragraph.className = 'chat__paragraph';
            paragraph.textContent = block.text;
            messageContentEl.append(paragraph);
        }

        if (block.type === 'list') {
            const list = document.createElement(block.ordered ? 'ol' : 'ul');
            list.className = 'chat__list';

            block.items.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.className = 'chat__list-item';
                listItem.textContent = item;
                list.append(listItem);
            });

            messageContentEl.append(list);
        }

        if (block.type === 'code') {
            const codeContainer = document.createElement('div');
            codeContainer.className = 'chat__code-container';

            const codeHeader = document.createElement('div');
            codeHeader.className = 'chat__code-header';

            const languageLabel = document.createElement('span');
            languageLabel.className = 'chat__code-language';
            languageLabel.textContent = block.language || 'code';

            const copyCodeButton = document.createElement('button');
            copyCodeButton.className = 'chat__code-copy-button';
            copyCodeButton.type = 'button';
            copyCodeButton.setAttribute('aria-label', 'Copy code');
            copyCodeButton.dataset.tooltip = 'Copy code';
            copyCodeButton.innerHTML = AppIcon({ iconName: 'copy', size: 16 });

            copyCodeButton.addEventListener('click', async () => {
                await navigator.clipboard.writeText(block.code);
                copyCodeButton.innerHTML = AppIcon({ iconName: 'check', size: 16 });
                copyCodeButton.dataset.tooltip = 'Copied';

                setTimeout(() => {
                    copyCodeButton.innerHTML = AppIcon({ iconName: 'copy', size: 16 });
                    copyCodeButton.dataset.tooltip = 'Copy code';
                }, 1000);
            });

            codeHeader.append(languageLabel, copyCodeButton);

            const codeBlock = document.createElement('pre');
            codeBlock.className = 'chat__code-block';
            codeBlock.textContent = block.code;

            codeContainer.append(codeHeader, codeBlock);
            messageContentEl.append(codeContainer);
        }

        if (block.type === 'table') {
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'chat__table-wrapper';

            const table = document.createElement('table');
            table.className = 'chat__table';

            const headerRow = document.createElement('tr');
            headerRow.className = 'chat__table-row';
            block.headers.forEach((header) => {
                const headerCell = document.createElement('th');
                headerCell.className = 'chat__table-header';
                headerCell.textContent = header;
                headerRow.append(headerCell);
            });
            table.append(headerRow);

            block.rows.forEach((row) => {
                const tableRow = document.createElement('tr');
                tableRow.className = 'chat__table-row';
                row.forEach((cell) => {
                    const tableCell = document.createElement('td');
                    tableCell.className = 'chat__table-cell';
                    tableCell.textContent = cell;
                    tableRow.append(tableCell);
                });
                table.append(tableRow);
            });

            tableWrapper.append(table);
            messageContentEl.append(tableWrapper);
        }
    });
}

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
        if (role === 'assistant' && Array.isArray(content)) {
            addAssistantBlocks(messageContentEl, content);
        } else {
            messageContentEl.textContent = content;
        }
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
            await navigator.clipboard.writeText(messageContentEl.innerText);
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
