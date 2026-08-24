# ChatGPT UI Clone

A frontend-only recreation of the ChatGPT web app, built as a practice assignment — no frameworks, no backend, just HTML, SCSS and vanilla JS.

The goal wasn't to build a real AI product (there's zero real AI here), it was to see how close I could get to a genuinely complex, production-feeling UI using just the basics.

---

## Tech used

- HTML5
- SCSS
- Vanilla JavaScript (ES modules)
- Lucide icons, inlined as SVG

No React, Vue, Angular, Bootstrap, Tailwind, or anything else. All hand-built.

---

## Project structure

```text
10_ChatGPT_Web_Application/
│
├── index.html
├── README.md
│
├── assets/icons/
│   └── brand-logo.svg
│
├── js/
│   ├── app.js                 
│   ├── components/
│   │   ├── composer.js         
│   │   ├── messages.js         
│   │   ├── new_chat.js        
│   │   ├── search_modal.js    
│   │   ├── sidebar_footer.js   
│   │   └── sidebar_items.js    
│   ├── containers/
│   │   ├── chat.js             
│   │   └── sidebar.js         
│   ├── constant/
│   │   └── mockConvoData.js    
│   └── utils/
│       ├── app_icon.js         
│       └── dateGroup.js        
│
└── scss/
    ├── main.scss
    ├── abstract/
    │   ├── _variables.scss    
    │   └── _mixins.scss
    └── components/
        ├── _sidebar.scss
        ├── _sidebar-item.scss
        ├── _sidebar-footer.scss
        ├── _search-modal.scss
        ├── _new-chat.scss
        ├── _chat.scss
        ├── _chat_header.scss
        ├── _composer.scss
        └── _messages.scss
```

`components/` = one self-contained piece of UI. `containers/` = the bigger sections that pull a bunch of components together (sidebar.js, chat.js). Not a hard rule, just how I kept myself organized.

---

## SCSS architecture

- **`abstract/`** — variables + mixins, no actual CSS output. Everything else reads from here instead of hardcoding values.
- **`components/`** — one file per UI piece, named to match its JS counterpart.

`main.scss` imports everything and compiles to `main.css`.

Went with plain SCSS variables (`$bg-primary`, `$space-4`) over Sass maps — started with maps, found plain variables quicker to write while actually building stuff, so I switched.

---

## Design tokens

All in `_variables.scss`:

- **Colors** — surfaces, text, borders, accent, semantic (success/warning/error/info)
- **Spacing** — `$space-1` → `$space-20`, 4px scale
- **Typography** — sizes, weights, line-heights, letter-spacing
- **Radius** — sm/md/lg/xl/full
- **Shadows** — cards, dropdowns, focus ring
- **Breakpoints** — below

No random hardcoded values floating around — if I used something twice it became a token.

---

## Breakpoints

```scss
$bp-sm:  480px;
$bp-md:  768px;
$bp-lg:  1024px;
$bp-xl:  1280px;
$bp-2xl: 1440px;
```

Tested at 375/390/414/768/1024/1280/1440/1728px. Sidebar goes fixed column (desktop) → collapsible (tablet) → full drawer (mobile). Didn't just shrink things down, sidebar especially needed a real rethink once it had no room to sit permanently.

---

## JavaScript structure

One file, one job, all ES modules:

| File | Job |
|---|---|
| `app.js` | boots everything |
| `containers/sidebar.js` | sidebar shell — header, nav, collapse, groups |
| `containers/chat.js` | active conversation / empty state |
| `components/sidebar_items.js` | one conversation row |
| `components/sidebar_footer.js` | account/upgrade footer |
| `components/search_modal.js` | search UI + filtering |
| `components/new_chat.js` | empty-state welcome screen |
| `components/composer.js` | textarea, send/stop, attachments |
| `components/messages.js` | turns message blocks into markup |
| `utils/app_icon.js` | name in, inline SVG out |
| `utils/dateGroup.js` | date bucketing |
| `constant/mockConvoData.js` | mock conversations |

Only `app.js` is loaded in `index.html` — everything else comes in through imports.

---

## Key decisions

- **Assistant messages are structured blocks, not raw text.** Rather than writing a Markdown parser from scratch, each mock message is an array like `{ type: "list" }`, `{ type: "code" }`, etc, and `messages.js` has one small render function per type.
- **Icons are always inline SVG, never `<img>`.** Needed `currentColor` for theming/hover, and `<img>`-loaded SVGs can't be styled from CSS at all.
- **No button-inside-button.** Ran into this with the pin/more-menu and the account/upgrade footer — split those into a plain wrapper with sibling buttons instead.
- **Hover-only icons also show on `:focus-within`**, so keyboard users don't lose access to them.

---

## Known limitations

- Search, model selector, and attachments are all fake — no real filtering/upload/model logic
- Regenerate just swaps in another canned response, no real context awareness
- Rename/delete update the UI but don't persist — refresh resets everything
- Settings panel exists but most toggles inside don't actually do anything yet
- Only tested in Chrome so far

---

## What I'd improve with more time

- Persist state with localStorage so a refresh doesn't wipe everything
- A real streaming-style animation for the mock AI response instead of it just popping in
- More keyboard shortcuts (Cmd+K for search, etc.)
- Better attachment error handling, right now it's mostly happy path
- A proper screen-reader pass instead of just following best practices while building

---

## Disclaimer

Learning project only. No real AI, no OpenAI connection, not meant to be an actual product — just practice.