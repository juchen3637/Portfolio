export type GameStatus = "live" | "external" | "coming-soon";

export interface GameMeta {
  slug: string;
  title: string;
  blurb: string;
  status: GameStatus;
  rarity?: string;
  tags?: string[];
  externalUrl?: string;
  rotate?: number;
}

export const GAMES: GameMeta[] = [
  {
    slug: "2048",
    title: "2048",
    blurb:
      "Slide tiles to combine matching numbers. Reach 2048 before the board fills up.",
    status: "live",
    rarity: "★★★★ EPIC",
    tags: ["puzzle", "single-player", "keyboard", "touch"],
    rotate: -1,
  },
  {
    slug: "snake",
    title: "Snake",
    blurb:
      "Eat the food, grow the tail, don't crash into yourself or the walls. Classic.",
    status: "live",
    rarity: "★★★ RARE",
    tags: ["arcade", "single-player", "keyboard", "touch"],
    rotate: 2,
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    blurb:
      "Reveal cells without hitting a mine. Numbers tell you how many mines neighbor a cell.",
    status: "live",
    rarity: "★★★★ EPIC",
    tags: ["puzzle", "single-player", "logic"],
    rotate: -2,
  },
  {
    slug: "memory",
    title: "Memory Match",
    blurb:
      "Flip cards in pairs. Match every symbol to clear the board. Fewer moves is better.",
    status: "live",
    rarity: "★★ COMMON",
    tags: ["puzzle", "single-player", "casual"],
    rotate: 1,
  },
  {
    slug: "tictactoe",
    title: "Tic-Tac-Toe",
    blurb:
      "Three in a row vs an unbeatable minimax AI. Best you can do is draw.",
    status: "live",
    rarity: "★★★ RARE",
    tags: ["strategy", "vs-ai", "minimax"],
    rotate: -1,
  },
  {
    slug: "wordle",
    title: "Wordle",
    blurb:
      "Guess the 5-letter word in six tries. Green = right spot, magenta = wrong spot.",
    status: "live",
    rarity: "★★★★ EPIC",
    tags: ["puzzle", "single-player", "words"],
    rotate: 2,
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
