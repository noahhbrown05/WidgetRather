/**
 * The Pastel Critters roster (D-016, design/critters.md), single source for
 * names + personality lines. Lines punched up for Noah's "cute but a bit
 * chaotic" direction (2026-10-01). Silhouette notes say what must read at 22px.
 */
export const ROSTER = [
  { name: 'Capy', animal: 'Capybara', silhouette: 'flat loaf head, tiny round ears', line: 'Would rather nap through the apocalypse.' },
  { name: 'Kip', animal: 'Koala', silhouette: 'huge fuzzy side ears, big dark nose', line: 'Would rather cling to a bad idea than let it go.' },
  { name: 'Bun', animal: 'Bunny', silhouette: 'two tall ears, one flopped', line: 'Would rather have snacks than be right. Actually, both.' },
  { name: 'Ribbs', animal: 'Frog', silhouette: 'two eye bumps on top', line: 'Would rather jump first and never ask questions.' },
  { name: 'Fen', animal: 'Fox', silhouette: 'big pointy ears, pointed muzzle', line: 'Would rather be clever than lucky. Is somehow both.' },
  { name: 'Ollie', animal: 'Otter', silhouette: 'small round ears, whisker dots', line: 'Would rather hold hands than hold grudges. Holds snacks too.' },
  { name: 'Maple', animal: 'Red panda', silhouette: 'round ears, white eyebrow markings', line: 'Would rather be cozy than cool, and is cooler for it.' },
  { name: 'Puddle', animal: 'Duckling', silhouette: 'flat beak, one hair tuft', line: 'Would rather splash first and apologise never.' },
  { name: 'Burr', animal: 'Hedgehog', silhouette: 'spiky crown', line: 'Would rather be honest than polite. Sorry. Not sorry.' },
  { name: 'Mochi', animal: 'Cat', silhouette: 'triangle ears, forehead stripe', line: 'Would rather knock it off the table and see.' },
  { name: 'Beanie', animal: 'Bear cub', silhouette: 'two round ears on top', line: 'Would rather hug it out. Aggressively.' },
  { name: 'Rascal', animal: 'Raccoon', silhouette: 'round ears, dark eye-mask', line: 'Would rather know the secret than keep it.' },
] as const;

export type CritterName = (typeof ROSTER)[number]['name'];
