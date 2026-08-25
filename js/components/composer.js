import { AppIcon } from '../utils/app_icon.js';

let composerEl;
let textareaEl;
let sendBtn;
let attachBtn;
let micBtn;
let modelButton;
let modelMenu;
let fileInputEl;
let onSendMessage;

const MAX_TEXTAREA_HEIGHT = 200;
const EXPANDED_COMPOSER_LENGTH = 50;
const MODELS = [
    { name: 'GPT-5 nano', description: 'Fastest and lowest cost' },
    { name: 'GPT-5 mini', description: 'Fast and cost-efficient' },
    { name: 'GPT-5', description: 'Best for reasoning and coding' },
];

export function initComposer(callbacks = {}) {
    onSendMessage = callbacks.onSendMessage;
     composerEl = document.querySelector('.composer');

    renderComposer();

    bindEvents();
}

export function setComposerGenerating(isGenerating) {
    composerEl.classList.toggle('is-generating', isGenerating);
    textareaEl.disabled = isGenerating;
    sendBtn.disabled = isGenerating;
    sendBtn.setAttribute('aria-label', isGenerating ? 'Generating response' : 'Send message');
    sendBtn.innerHTML = AppIcon({ iconName: isGenerating ? 'square' : 'arrow_up', size: 20 });
}


function renderComposer() {
    composerEl.innerHTML = `
        <div class="composer__attachments" aria-label="Attached files"></div>

        <div class="composer__row">

            <button type="button" class="composer__icon-btn composer__attach-btn" aria-label="Attach file">
                ${AppIcon({ iconName: 'plus',size:20 })}
            </button>

            <input type="file" class="composer__file-input" hidden multiple accept="image/*,.pdf,.docx,.txt" />

            <textarea
                class="composer__textarea"
                aria-label="Message"
                placeholder="Ask anything"
                rows="1"
            ></textarea>

            <div class="composer__model-selector">
                <button type="button" class="composer__model-button" aria-expanded="false">
                    <span class="composer__model-name">GPT-5</span>
                    ${AppIcon({ iconName: 'chevron_down', size: 16 })}
                </button>

                <div class="composer__model-menu" hidden>
                    ${MODELS.map((model) => `
                        <button class="composer__model-option${model.name === 'GPT-5' ? ' composer__model-option--selected' : ''}" type="button" data-model-name="${model.name}">
                            <span class="composer__model-option-name">${model.name}</span>
                            <span class="composer__model-option-description">${model.description}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <button type="button" class="composer__icon-btn composer__mic-btn" aria-label="Use voice input">
                ${AppIcon({ iconName: 'mic',size:20 })}
            </button>

            <button type="submit" class="composer__send-btn" aria-label="Send message" disabled>
                ${AppIcon({ iconName: 'arrow_up', size:20 })}
            </button>

        </div>
    `;

    textareaEl  = composerEl.querySelector('.composer__textarea');
    sendBtn     = composerEl.querySelector('.composer__send-btn');
    attachBtn   = composerEl.querySelector('.composer__attach-btn');
    micBtn      = composerEl.querySelector('.composer__mic-btn');
    modelButton = composerEl.querySelector('.composer__model-button');
    modelMenu   = composerEl.querySelector('.composer__model-menu');
    fileInputEl = composerEl.querySelector('.composer__file-input');
}

function bindEvents() {
    textareaEl.addEventListener('input', handleInput);
    textareaEl.addEventListener('keydown', handleKeydown);

    composerEl.addEventListener('submit', handleSubmit);

    attachBtn.addEventListener('click', () => fileInputEl.click());
    fileInputEl.addEventListener('change', handleFileSelect);

    modelButton.addEventListener('click', toggleModelMenu);
    modelMenu.addEventListener('click', selectModel);
    micBtn.addEventListener('click', toggleMic);
}


function handleInput() {
    autoGrow();
    toggleSendButton();
}

function autoGrow() {
    const isLongMessage = textareaEl.value.length > EXPANDED_COMPOSER_LENGTH || textareaEl.value.includes('\n');
    composerEl.classList.toggle('composer--expanded', isLongMessage);

    textareaEl.style.height = 'auto';
    const isTooTall = textareaEl.scrollHeight > MAX_TEXTAREA_HEIGHT;
    textareaEl.style.height = Math.min(textareaEl.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px';
    textareaEl.style.overflowY = isTooTall ? 'auto' : 'hidden';
}

function toggleSendButton() {
    sendBtn.disabled = textareaEl.value.trim().length === 0;
}

function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) composerEl.requestSubmit();
    }
}

function handleSubmit(e) {
    e.preventDefault();

    const message = textareaEl.value.trim();
    if (!message) return;

    onSendMessage?.(message);

    textareaEl.value = '';

    autoGrow();
    toggleSendButton();
}

function toggleModelMenu() {
    const isOpen = modelMenu.hidden;
    modelMenu.hidden = !isOpen;
    modelButton.setAttribute('aria-expanded', String(isOpen));
}

function selectModel(event) {
    const selectedOption = event.target.closest('.composer__model-option');
    if (!selectedOption) return;

    modelButton.querySelector('.composer__model-name').textContent = selectedOption.dataset.modelName;
    modelMenu.querySelector('.composer__model-option--selected')
        ?.classList.remove('composer__model-option--selected');
    selectedOption.classList.add('composer__model-option--selected');
    modelMenu.hidden = true;
    modelButton.setAttribute('aria-expanded', 'false');
}


function toggleMic() {
    const isListening = micBtn.classList.toggle('composer__mic-btn--active');
    micBtn.setAttribute('aria-label', isListening ? 'Stop voice input' : 'Use voice input');
}


function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    files.forEach(addAttachmentPreview);
    fileInputEl.value = '';
}

function addAttachmentPreview(file) {
    const attachmentsEl = composerEl.querySelector('.composer__attachments');

    const chip = document.createElement('div');
    chip.className = 'composer__attachment-chip composer__attachment-chip--uploading';
    chip.innerHTML = `
        <span class="composer__attachment-name">${file.name}</span>
        <span class="composer__attachment-size">${formatFileSize(file.size)}</span>
        <button type="button" class="composer__attachment-remove" aria-label="Remove ${file.name}">
            ${AppIcon({ iconName: 'x', size: 14 })}
        </button>
    `;

    attachmentsEl.appendChild(chip);

    chip.querySelector('.composer__attachment-remove')
        .addEventListener('click', () => chip.remove());

    setTimeout(() => {
        chip.classList.remove('composer__attachment-chip--uploading');
        chip.classList.add('composer__attachment-chip--done');
    }, 1200);
}

function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
