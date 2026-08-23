// js/data/mockConversations.js

export const mockConversations = [
    // ---- CODE example ----
    {
        id: "c1",
        chat_title: "Correct Answer Variable",
        date: "2026-08-21T09:00:00.000Z",
        messages: [
            { role: "user", content: "How do I store the correct answer in a variable and check it against user input?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Declare a variable holding the correct answer, then compare it against whatever the user submits:" },
                    { type: "code", language: "js", code: `const correctAnswer = 'B';\n\nfunction checkAnswer(userInput) {\n  return userInput === correctAnswer;\n}\n\ncheckAnswer('B'); // true\ncheckAnswer('A'); // false` },
                    { type: "paragraph", text: "If the answer could change per question, store it inside a question object instead of a standalone variable, so each question carries its own answer:" },
                    { type: "code", language: "js", code: `const question = {\n  text: "What does CSS stand for?",\n  correctAnswer: "Cascading Style Sheets",\n};` },
                ],
            },
            { role: "user", content: "What if I have multiple questions, how should I structure that?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Use an array of question objects, each with its own answer:" },
                    { type: "code", language: "js", code: `const questions = [\n  { text: "2 + 2 = ?", correctAnswer: "4" },\n  { text: "Capital of France?", correctAnswer: "Paris" },\n];\n\nfunction checkAnswer(index, userInput) {\n  return questions[index].correctAnswer === userInput;\n}` },
                ],
            },
        ],
    },

    // ---- LIST + TABLE + CODE + LINK example (the richest one) ----
    {
        id: "c2",
        chat_title: "CSS Grid vs Flexbox",
        date: "2026-08-21T14:00:00.000Z",
        messages: [
            { role: "user", content: "When should I use CSS Grid instead of Flexbox?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "It comes down to how many dimensions you're laying out:" },
                    {
                        type: "list",
                        ordered: false,
                        items: [
                            "Use Grid when you need rows AND columns to align together — page layouts, dashboards, image galleries",
                            "Use Flexbox when you're laying out items in a single row or column — navbars, button groups, card content",
                            "They're not mutually exclusive — Grid for the page skeleton, Flexbox inside individual components",
                        ],
                    },
                    {
                        type: "table",
                        headers: ["Feature", "Grid", "Flexbox"],
                        rows: [
                            ["Dimensions", "2D (rows + columns)", "1D (row or column)"],
                            ["Best for", "Page-level layout", "Component-level layout"],
                            ["Item sizing", "Defined by the grid", "Items can grow/shrink"],
                        ],
                    },
                    { type: "paragraph", text: "A minimal 3-column grid looks like this:" },
                    { type: "code", language: "css", code: `.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}` },
                    { type: "paragraph", text: "For the full spec, see the [MDN Grid guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)." },
                ],
            },
            { role: "user", content: "Can I nest a flex container inside a grid item?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Yes — this is actually the most common real-world pattern. Each grid item can independently be its own flex container:" },
                    { type: "code", language: "css", code: `.card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}` },
                    { type: "paragraph", text: "This lets you use Grid to position the cards on the page, while Flexbox handles the layout of content *inside* each card." },
                ],
            },
        ],
    },

    // ---- PARAGRAPH only (short, simple exchange) ----
    {
        id: "c3",
        chat_title: "Debugging null reference error",
        date: "2026-08-21T16:00:00.000Z",
        messages: [
            { role: "user", content: "I keep getting 'Cannot read property of null'." },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "That usually means you're trying to access a DOM element before it exists. The most common cause is a script running before the DOM has finished loading." },
                ],
            },
            { role: "user", content: "My script tag is at the bottom of the body, shouldn't that be enough?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Usually yes — if it's genuinely the last thing before `</body>`, the DOM above it will already exist. Double check your selector itself isn't just wrong (a typo in a class name, or querying before that specific element is rendered by JS elsewhere)." },
                ],
            },
        ],
    },

    // ---- LIST (ordered, sequential steps) ----
    {
        id: "c4",
        chat_title: "Trip planning ideas",
        date: "2026-08-20T10:00:00.000Z",
        messages: [
            { role: "user", content: "Give me a 3-day itinerary for Manali." },
            {
                role: "assistant",
                content: [
                    {
                        type: "list",
                        ordered: true,
                        items: [
                            "Day 1: Old Manali cafes, Hidimba Temple, and a walk along the river",
                            "Day 2: Solang Valley for paragliding or cable car views",
                            "Day 3: Vashisht hot springs in the morning, local market for shopping in the evening",
                        ],
                    },
                ],
            },
            { role: "user", content: "Any recommendations for where to eat in Old Manali?" },
            {
                role: "assistant",
                content: [
                    {
                        type: "list",
                        ordered: false,
                        items: [
                            "Cafe 1947 — riverside seating, popular for breakfast",
                            "Drifters' Cafe — good for an evening with live music",
                            "Renaissance — reliable Italian food if you want a break from local cuisine",
                        ],
                    },
                ],
            },
        ],
    },

    // ---- PARAGRAPH, long repetitive thread (deliberate stress-test conversation) ----
    {
        id: "c5",
        chat_title: "Resume feedback",
        date: "2026-08-20T18:00:00.000Z",
        messages: [
            { role: "user", content: "Can you review my resume summary?" },
            { role: "assistant", content: [{ type: "paragraph", text: "Sure — paste it in and I'll suggest edits for clarity and impact." }] },
            { role: "user", content: "\"Frontend developer with 2 years experience in React and CSS, looking for new opportunities.\"" },
            { role: "assistant", content: [{ type: "paragraph", text: "That's a reasonable start, but it's generic — it could describe hundreds of candidates. Try naming a specific strength or outcome instead of just listing skills." }] },
            { role: "user", content: "Like what exactly?" },
            { role: "assistant", content: [{ type: "paragraph", text: "For example: \"Frontend developer who rebuilt a legacy React dashboard, cutting page load time by 40%.\" Numbers and specifics make it memorable." }] },
            { role: "user", content: "I don't have a metric like that though." },
            { role: "assistant", content: [{ type: "paragraph", text: "That's fine — even without a number, naming the actual project or problem you solved is more compelling than a skills list. \"Rebuilt a legacy dashboard\" already says more than \"experience in React.\"" }] },
            { role: "user", content: "Okay, let me try rewriting it." },
            { role: "assistant", content: [{ type: "paragraph", text: "Go for it — post the new version whenever you're ready and I'll take another pass." }] },
            { role: "user", content: "\"Frontend developer who rebuilt a legacy React dashboard and improved component reusability across the codebase.\"" },
            { role: "assistant", content: [{ type: "paragraph", text: "Much stronger. One small tweak: lead with the outcome, not the title — \"Rebuilt a legacy React dashboard and improved component reusability\" reads more actively than starting with your job title." }] },
            { role: "user", content: "Good point. Anything else?" },
            { role: "assistant", content: [{ type: "paragraph", text: "Keep it to one or two sentences max for a summary — recruiters skim this section in seconds, so brevity matters more than completeness." }] },
        ],
    },

    // ---- LIST (steps) + no code needed for a recipe ----
    {
        id: "c6",
        chat_title: "Recipe suggestions",
        date: "2026-08-18T12:00:00.000Z",
        messages: [
            { role: "user", content: "What can I cook with paneer and spinach?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Palak paneer is the classic choice. Here's a simple version:" },
                    {
                        type: "list",
                        ordered: true,
                        items: [
                            "Blanch the spinach briefly, then blend it into a smooth puree",
                            "Sauté chopped onions, garlic, and ginger until golden",
                            "Add the spinach puree along with cumin, garam masala, and salt, and simmer 5 minutes",
                            "Add paneer cubes, simmer another 2–3 minutes, and finish with a splash of cream",
                        ],
                    },
                ],
            },
            { role: "user", content: "Can I make it without cream?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Yes — a spoonful of cashew paste or a splash of milk gives a similar richness without cream. Some people skip the enrichment entirely and it's still good, just slightly less silky." },
                ],
            },
        ],
    },

    // ---- CODE (concept explanation with working example) ----
    {
        id: "c7",
        chat_title: "JavaScript closures explained",
        date: "2026-08-17T20:00:00.000Z",
        messages: [
            { role: "user", content: "Can you explain closures simply?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "A closure is a function that remembers the variables from where it was created, even after that outer function has finished running. Here's a small example:" },
                    { type: "code", language: "js", code: `function makeCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2\ncounter(); // 3` },
                    { type: "paragraph", text: "Even though `makeCounter()` has already returned, the inner function still has access to `count` — that's the closure at work." },
                ],
            },
            { role: "user", content: "Is this the same thing used in the module pattern?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Exactly the same mechanism. The module pattern uses a closure to keep some variables private while exposing only specific functions:" },
                    { type: "code", language: "js", code: `const bankAccount = (function () {\n  let balance = 0;\n  return {\n    deposit: (amount) => (balance += amount),\n    getBalance: () => balance,\n  };\n})();\n\nbankAccount.deposit(100);\nbankAccount.getBalance(); // 100\n// 'balance' itself is not accessible from outside` },
                ],
            },
        ],
    },

    // ---- TABLE (structured comparison across days) ----
    {
        id: "c8",
        chat_title: "Workout routine for beginners",
        date: "2026-08-15T08:00:00.000Z",
        messages: [
            { role: "user", content: "Suggest a 3-day beginner workout split." },
            {
                role: "assistant",
                content: [
                    {
                        type: "table",
                        headers: ["Day", "Focus", "Example"],
                        rows: [
                            ["Day 1", "Full body strength", "Squats, push-ups, rows"],
                            ["Day 2", "Rest or light cardio", "Walk, light cycling"],
                            ["Day 3", "Full body strength", "Same as Day 1, focus on form"],
                        ],
                    },
                ],
            },
            { role: "user", content: "Do I need any equipment for this?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "Not necessarily — all three exercises above can be done with just bodyweight. If you want to progress later, a pair of adjustable dumbbells is the single most versatile piece of equipment to add." },
                ],
            },
        ],
    },

    // ---- CODE (before/after comparison) ----
    {
        id: "c9",
        chat_title: "Old JS question",
        date: "2026-08-06T11:00:00.000Z",
        messages: [
            { role: "user", content: "Why does my for-loop with var behave weird in a setTimeout?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "`var` isn't block-scoped, so every callback in your loop ends up sharing the same variable instead of getting its own copy:" },
                    { type: "code", language: "js", code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// logs: 3, 3, 3` },
                    { type: "paragraph", text: "Switching to `let` fixes it, since `let` creates a fresh binding on every loop iteration:" },
                    { type: "code", language: "js", code: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// logs: 0, 1, 2` },
                ],
            },
        ],
    },

    // ---- LIST + LINK ----
    {
        id: "c10",
        chat_title: "Interview prep notes",
        date: "2026-07-30T15:00:00.000Z",
        messages: [
            { role: "user", content: "What are common frontend interview questions?" },
            {
                role: "assistant",
                content: [
                    {
                        type: "list",
                        ordered: false,
                        items: [
                            "Explain how the event loop works",
                            "CSS specificity and the box model",
                            "What closures are and how they're used",
                            "A live coding round building a small UI component",
                        ],
                    },
                    { type: "paragraph", text: "For a more thorough checklist, [Frontend Masters' interview guide](https://frontendmasters.com/) is a solid free resource." },
                ],
            },
            { role: "user", content: "How much should I prepare on system design for a frontend role?" },
            {
                role: "assistant",
                content: [
                    { type: "paragraph", text: "For junior/mid-level roles, light prep is usually enough — knowing how to structure components, manage state, and handle API calls at a high level. Deep frontend system design (covering things like caching strategy or micro-frontends) tends to matter more for senior roles." },
                ],
            },
        ],
    },
];
