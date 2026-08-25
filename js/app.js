import { initSidebar, renderConversationGroups } from "./containers/sidebar.js";
import { initChat, renderChatMessages, showNewChat } from './containers/chat.js';
import { addConversation, getConversations, saveConversations } from './utils/conversation_storage.js';
import { streamFakeResponse } from './utils/fake_response.js';

let currentConversation;
const conversations = getConversations();
const DUMMY_RESPONSE = 'This is a longer dummy AI response for testing the streaming effect. It appears one word at a time, so you can clearly see how a real chat response might be generated. In a real application, these words would come from an AI service. For now, this simple mock response lets you test loading, scrolling, message actions, and the completed response state without connecting to any external API.';

function renderChatFromUrl() {
  const chatId = new URLSearchParams(window.location.search).get('chatId');

  if (!chatId) {
    currentConversation = null;
    showNewChat();
    return;
  }

  const conversation = conversations.find((chat) => chat.id === chatId);

  if (!conversation) {
    currentConversation = null;
    showNewChat();
    alert('chat not found');
    return;
  }

  currentConversation = conversation;
  renderConversationGroups(conversations, currentConversation.id);
  renderChatMessages(currentConversation.messages);
}

function setChatId(chatId) {
  const url = new URL(window.location.href);

  if (chatId) {
    url.searchParams.set('chatId', chatId);
  } else {
    url.searchParams.delete('chatId');
  }

  window.history.pushState({}, '', url);
}

function sendMessage(message) {
  if (currentConversation) {
    currentConversation.messages.push({ role: 'user', content: message });
    saveConversations(conversations);
  } else {
    const newConversation = {
      id: `c${conversations.length + 1}`,
      chat_title: message.split(' ').slice(0, 4).join(' '),
      date: new Date().toISOString(),
      messages: [{ role: 'user', content: message }],
    };

    addConversation(conversations, newConversation);
    currentConversation = newConversation;
    renderConversationGroups(conversations, newConversation.id);
    setChatId(newConversation.id);
  }

  const conversation = currentConversation;
  renderChatMessages(conversation.messages, true, true);

  streamFakeResponse(DUMMY_RESPONSE, {
    onStart: () => {
      conversation.messages.push({ role: 'assistant', content: '', isGenerating: true });
    },
    onUpdate: (message) => {
      const response = conversation.messages[conversation.messages.length - 1];
      response.content = message;
      renderChatMessages(conversation.messages, true);
    },
    onComplete: () => {
      const response = conversation.messages[conversation.messages.length - 1];
      response.isGenerating = false;
      saveConversations(conversations);
      renderChatMessages(conversation.messages);
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initChat({
    onSendMessage: sendMessage,
    onSuggestedPrompt: sendMessage,
  });
  initSidebar({
    conversations,
    onConversationSelect: (conversation) => {
      setChatId(conversation.id);
      renderChatFromUrl();
    },
    onNewChat: () => {
      setChatId();
      currentConversation = null;
      showNewChat();
    },
  });

  renderChatFromUrl();
});
