/**
 * Pass 1 question file (D-021): "question list shipped inside the app as a file".
 *
 * THIS IS NOT THE QUESTION BANK. ROADMAP 1.2 ("question bank v1, 60+") is Noah's
 * task and stays Noah's. This is a small placeholder set so the scheduler and the
 * widget have real strings to run on. Replace the contents wholesale when Noah's
 * bank lands - only the shape below is load-bearing.
 *
 * Content rule (D-004): hypotheticals only, never about real people.
 */

export type Question = {
  /**
   * Stable id. Never renumber or reuse an id: answers are keyed to it, and in
   * pass 2 the server rejects duplicate votes per (user, question id).
   */
  id: string;
  /** The two options. Order is stable; "a" is always the first one shown. */
  a: string;
  b: string;
};

export const QUESTIONS: Question[] = [
  { id: 'q001', a: 'Be able to fly', b: 'Be invisible' },
  { id: 'q002', a: 'Always have to sing instead of speak', b: 'Always have to dance while walking' },
  { id: 'q003', a: 'Never have homework again', b: 'Never have chores again' },
  { id: 'q004', a: 'Live without music', b: 'Live without films' },
  { id: 'q005', a: 'Be the funniest person in the room', b: 'Be the smartest person in the room' },
  { id: 'q006', a: 'Have unlimited pizza', b: 'Have unlimited tacos' },
  { id: 'q007', a: 'Fight one horse-sized duck', b: 'Fight a hundred duck-sized horses' },
  { id: 'q008', a: 'Only be able to whisper', b: 'Only be able to shout' },
  { id: 'q009', a: 'Have a pause button for life', b: 'Have a rewind button for life' },
  { id: 'q010', a: 'Be stuck in summer forever', b: 'Be stuck in winter forever' },
  { id: 'q011', a: 'Read minds', b: 'See one minute into the future' },
  { id: 'q012', a: 'Never be able to lie', b: 'Never be able to keep a secret' },
];
