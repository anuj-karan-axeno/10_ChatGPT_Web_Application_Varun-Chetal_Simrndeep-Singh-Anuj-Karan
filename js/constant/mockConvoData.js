// js/data/mockConversations.js

export const mockConversations = [
    {
        id: "c1",
        chat_title: "Correct Answer Variable",
        date: "2026-08-21T09:00:00.000Z",
        messages: [
            { role: "user", content: "How do I store the correct answer in a variable?" },
            { role: "assistant", content: "You can declare it like `const correctAnswer = 'B';` and compare user input against it." },
        ],
    },
    {
        id: "c2",
        chat_title: "CSS Grid vs Flexbox",
        date: "2026-08-21T14:00:00.000Z",
        messages: [
            { role: "user", content: "When should I use CSS Grid instead of Flexbox?" },
            { role: "assistant", content: "Use Grid for two-dimensional layouts, and Flexbox for one-dimensional layouts like a navbar." },
        ],
    },
    {
        id: "c3",
        chat_title: "Debugging null reference error",
        date: "2026-08-21T16:00:00.000Z",
        messages: [
            { role: "user", content: "I keep getting 'Cannot read property of null'." },
            { role: "assistant", content: "That usually means you're accessing a DOM element before it exists. Make sure your script runs after the DOM has loaded." },
        ],
    },

    {
        id: "c4",
        chat_title: "Trip planning ideas",
        date: "2026-08-20T10:00:00.000Z",
        messages: [
            { role: "user", content: "Give me a 3-day itinerary for Manali." },
            { role: "assistant", content: "Day 1: Old Manali cafes and Hidimba Temple. Day 2: Solang Valley. Day 3: Vashisht hot springs." },
        ],
    },
    {
        id: "c5",
        chat_title: "Resume feedback",
        date: "2026-08-20T18:00:00.000Z",
        messages: [
            { role: "user", content: "Can you review my resume summary?" },
            { role: "assistant", content: "Sure — paste it in and I'll suggest edits for clarity and impact." },
        ],
    },

    {
        id: "c6",
        chat_title: "Recipe suggestions",
        date: "2026-08-18T12:00:00.000Z",
        messages: [
            { role: "user", content: "What can I cook with paneer and spinach?" },
            { role: "assistant", content: "Palak paneer is the classic choice — blend spinach into a puree and simmer with paneer cubes and spices." },
        ],
    },
    {
        id: "c7",
        chat_title: "JavaScript closures explained",
        date: "2026-08-17T20:00:00.000Z",
        messages: [
            { role: "user", content: "Can you explain closures simply?" },
            { role: "assistant", content: "A closure is a function that remembers variables from where it was created, even after the outer function has finished running." },
        ],
    },
    {
        id: "c8",
        chat_title: "Workout routine for beginners",
        date: "2026-08-15T08:00:00.000Z",
        messages: [
            { role: "user", content: "Suggest a 3-day beginner workout split." },
            { role: "assistant", content: "Day 1: Full body strength. Day 2: Rest or light cardio. Day 3: Full body strength again, focusing on form." },
        ],
    },

    {
        id: "c9",
        chat_title: "Old JS question",
        date: "2026-08-06T11:00:00.000Z",
        messages: [
            { role: "user", content: "Why does my for-loop with var behave weird in a setTimeout?" },
            { role: "assistant", content: "`var` isn't block-scoped, so all your timeouts share the same variable. Use `let` for a fresh binding per iteration." },
        ],
    },
    {
        id: "c10",
        chat_title: "Interview prep notes",
        date: "2026-07-30T15:00:00.000Z",
        messages: [
            { role: "user", content: "What are common frontend interview questions?" },
            { role: "assistant", content: "Expect questions on the event loop, CSS specificity, closures, and a live coding round." },
        ],
    },
];