/**
 * DUMMY DATA for the Today screen mockup (Raroque step 1: UI with dummy data
 * first, `Q13QOgwoF0E @ 01:02`). Nothing here is real or wired up yet.
 * Pass 2 replaces this file with calls to Greg's data layer (D-021, D-017:
 * screens call his functions, never the database).
 *
 * Shapes follow MVP-SPEC: friend groups show names + who picked what (D-004),
 * capped at 50 (D-019); communities show totals only, no member list (D-018).
 */
import type { CritterBody, Option } from '../../ui';

export type Question = { a: string; b: string };

export type Friend = { name: string; critter: string; body: CritterBody; pick?: Option };

export type FriendGroup = { id: string; kind: 'friends'; name: string; members: Friend[] };

/** D-018: a community exposes totals only, never members. */
export type Community = { id: string; kind: 'community'; name: string; memberCount: number; percentA: number };

export type Circle = FriendGroup | Community;

export const TODAY: Question = { a: 'Read minds', b: 'See the future' };

export const YESTERDAY = {
  question: { a: 'Always be 10 minutes late', b: 'Always be 20 minutes early' } as Question,
  myPick: 'b' as Option,
  groupPercentA: 41,
};

/** Share of everyone (all users) who picked A today. Feeds Rare pick + Split meter. */
export const EVERYONE_PERCENT_A = 54;

/** True if today's split is the closest to 50/50 of the last 7 questions (MVP-SPEC §5). */
export const MOST_DIVISIVE_THIS_WEEK = false;

export const TWIN = { name: 'Maya', critter: 'Kip', body: 'skyGrey' as CritterBody, matched: 8, of: 10 };

const people = (rows: [string, string, CritterBody, Option | undefined][]): Friend[] =>
  rows.map(([name, critter, body, pick]) => ({ name, critter, body, pick }));

export const CIRCLES: Circle[] = [
  {
    id: 'g1',
    kind: 'friends',
    name: 'Lunch table',
    members: people([
      ['Maya', 'Kip', 'skyGrey', 'a'],
      ['Jordan', 'Fen', 'peach', 'b'],
      ['Priya', 'Bun', 'mint', 'a'],
      ['Diego', 'Rascal', 'skyGrey', 'a'],
      ['Nia', 'Mochi', 'blushSand', 'b'],
      ['Sam', 'Ribbs', 'sage', 'a'],
      ['Leo', 'Capy', 'butter', undefined], // hasn't answered yet
    ]),
  },
  {
    id: 'g2',
    kind: 'friends',
    name: 'Cousins',
    members: people([
      ['Ava', 'Puddle', 'butter', 'b'],
      ['Eli', 'Beanie', 'peach', 'b'],
      ['Zoe', 'Maple', 'mint', 'a'],
    ]),
  },
  { id: 'c1', kind: 'community', name: 'Lincoln High', memberCount: 412, percentA: 61 },
];

/** Fixed reaction set (MVP-SPEC §8: "about 6 emoji", no free text). Placeholder picks. */
export const REACTIONS = ['😂', '😱', '🤔', '🔥', '👀', '💯'] as const;
