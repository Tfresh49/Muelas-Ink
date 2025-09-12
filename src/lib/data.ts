import type { Story, Comment } from './types';

export const allStories: Story[] = [
  {
    id: 'the-whispering-woods',
    title: 'The Whispering Woods',
    author: 'Elara Vance',
    excerpt: 'An ancient forest that communicates through the rustling of its leaves holds a secret that could change the world.',
    content: `In the heart of Aerthos, the Whispering Woods was a place of legend. They said the trees were sentient, their leaves susurrating ancient truths to those who knew how to listen. Lyra, a young botanist with an uncanny connection to nature, was determined to understand their language. Armed with her grandfather's journal, she ventured into the shimmering, emerald gloom. The air grew thick with unspoken words, and the light filtered through the canopy in shifting patterns that seemed to form glyphs. It was here she discovered that the Woods were not just whispering secrets of the past, but prophesying a looming darkness that only she could prevent. The fate of Aerthos rested on her ability to translate the leafy whispers into a call to action.`,
    category: 'Fantasy',
    tags: ['magic', 'adventure', 'nature'],
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    imageHint: 'mystical forest'
  },
  {
    id: 'chronos-echo',
    title: 'Chronos\' Echo',
    author: 'Jax Cortex',
    excerpt: 'In the neon-drenched metropolis of Neo-Veridia, a data-heist goes wrong, sending a cynical hacker through time.',
    content: `Kaelen was the best net-runner in the underbelly of Neo-Veridia. His latest job: stealing corporate secrets from Chronos Corp. But when he jacked in, a surge of energy threw his consciousness back 20 years. Trapped in a past he only knew from history vids, Kaelen must navigate a less-connected world to find a way back. His only clue is a digital echo, a ghost of the Chronos program that brought him here. He soon realizes he wasn't sent back by accident. He has a chance to stop the very corporation he was robbing from ever rising to power, but meddling with time has consequences he can't possibly foresee.`,
    category: 'Sci-Fi',
    tags: ['cyberpunk', 'time travel', 'dystopian'],
    imageUrl: 'https://picsum.photos/seed/102/600/400',
    imageHint: 'futuristic city'
  },
  {
    id: 'the-sunken-star',
    title: 'The Sunken Star',
    author: 'Mara Stone',
    excerpt: 'A mysterious monolith discovered in the deepest ocean trench begins to emit a signal that resonates with ancient myths.',
    content: `The Mariana Trench held its secrets close, but the crew of the submersible 'Triton' was about to uncover its greatest one. Dr. Aris Thorne and his team discovered an impossible structure: a perfectly smooth, obsidian monolith humming with a faint energy. Dubbed 'The Sunken Star', its discovery sent shockwaves through the scientific community. As they studied it, the monolith began broadcasting a complex signal, a song that mirrored the creation myths of civilizations long dead. Aris realizes they haven't found a rock; they've found a Rosetta Stone for the universe, a message from the dawn of time that could either be humanity's salvation or its final epitaph.`,
    category: 'Sci-Fi',
    tags: ['mystery', 'exploration', 'first contact'],
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    imageHint: 'ancient monolith'
  },
  {
    id: 'emberwing',
    title: 'Emberwing',
    author: 'Kaelen Blackwood',
    excerpt: 'In a world ruled by dragon-riders, a young stable hand forms an unlikely bond with a supposedly untamable dragon.',
    content: `From the Dragon Peaks of Drakoria, the elite Dragon Guard kept the peace. For Finn, a lowly stable hand, riding a dragon was a distant dream. He spent his days tending to the mighty beasts, never imagining he would bond with one. But Emberwing was different. Feared for his volcanic temper and scarred hide, no rider had ever been able to tame him. Yet, Finn saw not a monster, but a kindred, lonely spirit. A secret friendship bloomed in the shadows of the stables, a bond that would be tested when a forgotten evil rises from the south, threatening the very heart of Drakoria. Finn and Emberwing, the outcast boy and the untamable dragon, may be the kingdom's only hope.`,
    category: 'Fantasy',
    tags: ['dragons', 'coming of age', 'epic'],
    imageUrl: 'https://picsum.photos/seed/104/600/400',
    imageHint: 'dragon mountain'
  },
  {
    id: 'void-drifter',
    title: 'Void Drifter',
    author: 'Ren Helix',
    excerpt: 'The last human alive pilots a ramshackle starship through the silent ruins of a galactic civilization, searching for answers.',
    content: `Centuries after 'The Silence' fell and every other human vanished in a flash of light, Zara is alone. She drifts through the cosmic graveyard of a once-thriving galaxy in her ship, 'The Wanderer'. Accompanied only by the ship's quirky AI, she follows the faint energy trails left by The Silence, a breadcrumb trail she hopes will lead to an explanation. Her journey takes her to awe-inspiring and terrifying worlds, abandoned by races far older than her own, all victims of the same phenomenon. Each discovery adds a piece to the puzzle of what happened to her people, and whether she is truly the last one left.`,
    category: 'Sci-Fi',
    tags: ['space opera', 'loneliness', 'adventure'],
    imageUrl: 'https://picsum.photos/seed/105/600/400',
    imageHint: 'spaceship nebula'
  },
  {
    id: 'the-archivist-of-souls',
    title: 'The Archivist of Souls',
    author: 'Silas Crane',
    excerpt: 'A librarian in a magical library that contains the life stories of every person, living or dead, finds a book that is still being written.',
    content: `The Great Library of Alexandria was a pale imitation of the Scriptorium, a place outside of time and space where every life is a book on a shelf. Elias is an Archivist, a guardian of these stories. His duty is to preserve, never to read. But one day, a new book appears, its vellum cover still warm, its ink still wet. It is the story of a young woman in the living world whose life is on a path to catastrophe. Breaking his most sacred vow, Elias begins to read, and discovers he might be able to leave notes in the margins, nudges that could alter her fate. But changing a story is a perilous act, and the Librarians who came before him have long warned of the consequences.`,
    category: 'Fantasy',
    tags: ['magic', 'books', 'destiny'],
    imageUrl: 'https://picsum.photos/seed/106/600/400',
    imageHint: 'hidden library'
  }
];

export const allComments: Comment[] = [
    {
        id: 'comment-1',
        storyId: 'the-whispering-woods',
        author: 'Bookworm_88',
        content: 'What an incredible concept! The imagery of a sentient forest is just beautiful. I can\'t wait to see where Lyra\'s journey takes her.',
        timestamp: '2 hours ago',
        avatarUrl: 'https://picsum.photos/seed/201/40/40'
    },
    {
        id: 'comment-2',
        storyId: 'the-whispering-woods',
        author: 'FantasyFanatic',
        content: 'This gives me serious Princess Mononoke vibes, and I am here for it. The world-building is already so rich.',
        timestamp: '1 day ago',
        avatarUrl: 'https://picsum.photos/seed/202/40/40'
    },
    {
        id: 'comment-3',
        storyId: 'chronos-echo',
        author: 'Cyberpunk_Sam',
        content: 'Time travel and cyberpunk? Sign me up! The idea of a high-tech hacker in a low-tech past is genius.',
        timestamp: '5 hours ago',
        avatarUrl: 'https://picsum.photos/seed/203/40/40'
    }
];
