import { mockConversations } from '../constant/mockConvoData.js';

const STORAGE_KEY = 'chat-conversations';

export function getConversations() {
    const savedConversations = localStorage.getItem(STORAGE_KEY);

    if (savedConversations) {
        return JSON.parse(savedConversations);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockConversations));
    return mockConversations;
}

export function saveConversations(conversations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function addConversation(conversations, conversation) {
    conversations.push(conversation);
    saveConversations(conversations);
}
