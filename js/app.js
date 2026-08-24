import { initSidebar, renderConversationGroups } from "./containers/sidebar.js";
import { initChat, renderChatMessages, showNewChat } from './containers/chat.js';
import { mockConversations } from './constant/mockConvoData.js';

let currentConversation;
const DUMMY_RESPONSE = 'This is a dummy response. Your real AI response will appear here later.';

function renderChatFromUrl() {
  const chatId = new URLSearchParams(window.location.search).get('chatId');

  if (!chatId) {
    currentConversation = null;
    showNewChat();
    return;
  }

  const conversation = mockConversations.find((chat) => chat.id === chatId);

  if (!conversation) {
    currentConversation = null;
    showNewChat();
    alert('chat not found');
    return;
  }

  currentConversation = conversation;
  renderConversationGroups(mockConversations, currentConversation.id);
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
  } else {
    const newConversation = {
      id: `c${mockConversations.length + 1}`,
      chat_title: message.split(' ').slice(0, 8).join(' '),
      date: new Date().toISOString(),
      messages: [{ role: 'user', content: message }],
    };

    mockConversations.push(newConversation);
    currentConversation = newConversation;
    renderConversationGroups(mockConversations, newConversation.id);
    setChatId(newConversation.id);
  }

  renderChatMessages(currentConversation.messages, true);

  setTimeout(() => {
    currentConversation.messages.push({ role: 'assistant', content: DUMMY_RESPONSE });
    renderChatMessages(currentConversation.messages);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initChat({ onSendMessage: sendMessage });
  initSidebar({
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
