/**
 * A large pool of suggestions for the "Try Asking" component
 * Categorized for better organization and selection
 */

// General knowledge questions
const GENERAL_KNOWLEDGE = [
  'What can you do?',
  'Tell me a fun fact',
  "What's the tallest mountain in the world?",
  'How do airplanes fly?',
  'Explain how the internet works',
  'What causes rainbows?',
  'How do vaccines work?',
  'Explain climate change in simple terms',
  'How does GPS navigation work?',
  'Why is the sky blue?',
];

// Creative and fun prompts
const CREATIVE = [
  'Tell me a joke',
  'Write a short poem about technology',
  'Create a quick story about a robot',
  'Give me a creative writing prompt',
  'Invent a new ice cream flavor',
  'Tell me a science fiction story',
  'Create a riddle for me to solve',
  'Write a haiku about nature',
  'Tell me an inspirational quote',
  'Make up a funny superhero name and power',
];

// Personal development
const PERSONAL = [
  'Productivity tips for work',
  'How to develop a new habit',
  'Tips for better sleep',
  'Quick meditation exercises',
  'How to be more creative',
  'Ways to reduce stress',
  'Tips for effective communication',
  'How to improve focus',
  'Simple exercises I can do at home',
  'How to start journaling',
];

// Technology and science
const TECH = [
  'Explain quantum computing',
  'What is artificial intelligence?',
  'How do smartphones work?',
  'Explain blockchain technology',
  'What are black holes?',
  'How do electric cars work?',
  'Latest developments in AI',
  'What is machine learning?',
  'How do solar panels work?',
  'Explain DNA in simple terms',
];

// Current events and culture
const CURRENT = [
  'Current news',
  'Recent technological breakthroughs',
  'Popular books to read',
  'Movie recommendations',
  'Trending tech gadgets',
  'Recent space discoveries',
  'Environmental conservation efforts',
  'Latest scientific research',
  'Upcoming technology trends',
  'Recent medical advances',
];

// Combine all suggestions into one pool
export const ALL_SUGGESTIONS = [
  ...GENERAL_KNOWLEDGE,
  ...CREATIVE,
  ...PERSONAL,
  ...TECH,
  ...CURRENT,
];

/**
 * Get random suggestions from the pool
 * @param {number} count - Number of suggestions to return
 * @return {string[]} - Array of random suggestions
 */
export const getRandomSuggestions = (count = 5) => {
  // Create a copy to avoid modifying the original array
  const shuffled = [...ALL_SUGGESTIONS];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' items
  return shuffled.slice(0, count);
};
