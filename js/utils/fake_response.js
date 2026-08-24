const RESPONSE_DELAY = 2000;
const WORD_DELAY = 80;

export function streamFakeResponse(response, callbacks = {}) {
    const words = response.split(' ');
    let message = '';
    let wordIndex = 0;

    setTimeout(() => {
        callbacks.onStart?.();

        const stream = setInterval(() => {
            message += `${words[wordIndex]} `;
            callbacks.onUpdate?.(message.trim());
            wordIndex += 1;

            if (wordIndex === words.length) {
                clearInterval(stream);
                callbacks.onComplete?.();
            }
        }, WORD_DELAY);
    }, RESPONSE_DELAY);
}
