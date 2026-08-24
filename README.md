# ChatGPT UI Clone

A frontend-only ChatGPT-style interface built with HTML, SCSS, and vanilla JavaScript ES modules. It uses mock conversations and does not connect to OpenAI or any other AI service.

## Features

- Conversation sidebar grouped into Today, Yesterday, Previous 7 days, and Older
- Collapsible desktop sidebar and slide-in mobile sidebar
- Mobile close button, backdrop, and automatic sidebar closing after choosing an item
- URL chat selection using `?chatId=...`
- New-chat welcome screen with suggested prompts
- Search modal for finding mock conversations
- User and AI message actions, copy buttons, tooltips, and expandable long user messages
- AI message blocks for paragraphs, lists, tables, and code blocks
- Code-block language label and copy button
- Responsive tables with horizontal scrolling
- Composer with auto-growing textarea, attachments, model selector, and voice button state
- Mock loading state followed by a word-by-word streaming response
- Conversation data saved in `localStorage`

## Run the project

1. Open this folder in VS Code.
2. Start `index.html` with Live Server, or use another local static server.
3. Keep Live Sass Compiler running when you change SCSS files.

The app is plain static HTML, so no `npm install` is needed.

## Local storage

On the first load, the app copies `mockConversations` into browser `localStorage` under the key:

```text
chat-conversations
```

New conversations, user messages, and completed mock responses are saved there. To start with the original mock data again, clear that key from your browser's DevTools storage panel.

## Project structure

```text
index.html
js/
  app.js                         # Starts the app and manages conversations
  components/
    composer.js                  # Message composer and model selector
    messages.js                  # Message, code, table, and loading UI
    new_chat.js                  # Welcome screen and suggested prompts
    search_modal.js              # Search modal UI
    sidebar_footer.js            # Footer settings menu
    sidebar_items.js             # One sidebar conversation item
  containers/
    chat.js                      # Chat header and chat rendering
    sidebar.js                   # Sidebar rendering and interactions
  constant/
    mockConvoData.js             # Starting mock conversations
  utils/
    app_icon.js                  # Inline SVG icon helper
    conversation_storage.js      # localStorage helpers
    dateGroup.js                 # Conversation date groups
    fake_response.js             # Fake delay and word-by-word response stream
scss/
  abstract/
    _variables.scss              # Colors, spacing, typography, and layout values
    _mixins.scss                 # Shared SCSS mixins
  components/                    # One SCSS partial for each UI area
  main.scss                      # Imports all SCSS partials
  main.css                       # Compiled CSS used by index.html
```

## How a new chat works

When the user sends the first message from a new chat, the app:

1. Creates a conversation object.
2. Uses the first words of the message as the sidebar title.
3. Adds the conversation to the saved conversation array.
4. Updates the URL with `?chatId=...`.
5. Shows a loading state and then streams a mock AI response word by word.
6. Saves the completed response to `localStorage`.

Suggested prompts use the exact same send-message logic.

## Styling

The project uses BEM-style class names such as `.chat__message`, `.composer__send-btn`, and `.sidebar__group-header`.

Design values are kept in `scss/abstract/_variables.scss`, including colors, spacing, font sizes, radii, shadows, breakpoints, sidebar widths, and composer width.

## Limitations

- No real AI or backend
- The response, attachment upload, voice input, and model selection are UI-only mock behavior
- Settings footer items do not open real settings pages
- Saved data is stored only in the current browser

## Disclaimer

This is a learning project inspired by a chat interface. It is not affiliated with or connected to OpenAI.
