> **Art direction locked 2026-10-01 (D-024):** soft & round, no outlines · tiny dot eyes + small mouth · head only in a circle · "cute but a bit chaotic" · any critter x 8 colours · a **ring** around the circle tints pink/blue after voting (replaces the bandana below) · moods **sleepy / happy / chaotic** · drawn as SVG code with modular faces. **Code is the source of truth now:** names + punched-up lines live in `app/src/ui/critters/roster.ts`, art in `heads.tsx` + `faces.tsx` (branch `noah/critters-svg` until merged). **All 12 drawn (2026-10-07).** The roster below is the original draft, kept for history; the final roster is right here.

## Final roster (2026-10-07, in code)
Six of the draft animals were swapped in Noah's review, for look or for a more distinct outline at 22px.

| # | Name | Critter | What makes it readable | Line |
|---|---|---|---|---|
| 1 | **Capy** | Capybara | Tall blocky head, long snout, tiny ears | "Would rather nap through the apocalypse." |
| 2 | **Kip** | Koala _(was Axie, axolotl)_ | Big fuzzy side ears, big dark nose | "Would rather cling to a bad idea than let it go." |
| 3 | **Bun** | Bunny | One tall ear, one flopped | "Would rather have snacks than be right. Actually, both." |
| 4 | **Ribbs** | Frog | Two eye bumps on top | "Would rather jump first and never ask questions." |
| 5 | **Fen** | Fox | Big pointy ears, pointed light muzzle | "Would rather be clever than lucky. Is somehow both." |
| 6 | **Ollie** | Otter | Wide head, small ears low on the sides, whisker dots | "Would rather hold hands than hold grudges. Holds snacks too." |
| 7 | **Oreo** | Panda _(was Maple, red panda)_ | Dark round ears + dark eye patches | "Would rather eat dessert first. And second." |
| 8 | **Puddle** | Duckling | Hair tuft, flat orange beak | "Would rather splash first and apologise never." |
| 9 | **Burr** | Hedgehog | Crown of spikes | "Would rather be honest than polite. Sorry. Not sorry." |
| 10 | **Truffle** | Pig _(was Mochi, cat)_ | Short perky ears with folded tips, big snout | "Would rather roll in it than overthink it." |
| 11 | **Chomp** | T-rex _(was Beanie, bear cub)_ | Chunky rectangle head, three head spikes, jaw panel with underbite fangs | "Would rather go extinct than be boring." |
| 12 | **Tux** | Penguin _(was Rascal, raccoon)_ | Dark head, light heart-shaped face, small beak | "Would rather show up overdressed. Every time." |

**Chaotic mood (final):** big left eye, small squint wink on the right, sweat drop, wide grin with the tongue out. No brow.

# The Critters: avatar roster draft (D-016)

_Text-only draft, 2026-09-11. Direction: **Pastel Critters** (Noah). Principles come from `research/avatar-case-study.md`. Noah owns design (D-017). Draw from this, change anything._

## The rules (write these before drawing, the Duolingo way)
1. **One base shape for everyone:** a soft, round "bean" head. No sharp corners; one consistent stroke weight.
2. **Heads only.** Avatars are circles, down to **~22px** on the large widget, so tails and bodies won't show. **Each critter must be recognisable from its head silhouette alone** (ears, frills, beak…).
3. **Pastel bodies, never the pick colours.** Bodies use a pastel set that avoids the exact option pink and blue, so the pick tint stays readable.
4. **Pick-tint accent:** every critter wears a small **bandana** that turns **pink (option A)** or **blue (option B)** after the reveal. Before voting it's neutral lavender.
5. **Tiny files:** flat vector shapes only; no textures or gradients-on-gradients (widget memory, `9sHd-VWssxw @ 02:04`).

## The roster (12)
| # | Name | Critter | Head silhouette (what makes it readable at 22px) | Would-rather personality |
|---|---|---|---|---|
| 1 | **Capy** | Capybara | Flat, loaf-shaped head, tiny round ears | "Would rather nap in a hot spring than do literally anything." |
| 2 | **Axie** | Axolotl | Three frilly gills on each side | "Would rather stay up late than wake up early. Always." |
| 3 | **Bun** | Bunny | Two tall ears (one flopped) | "Would rather have snacks than be right." |
| 4 | **Ribbs** | Frog | Two eye bumps sticking up on top | "Would rather jump in first and ask questions later." |
| 5 | **Fen** | Fox | Big pointy ears + a pointed muzzle | "Would rather be clever than lucky." |
| 6 | **Ollie** | Otter | Small round ears, whisker dots | "Would rather hold hands than hold grudges." |
| 7 | **Maple** | Red panda | Round ears + white "eyebrow" face markings | "Would rather be cozy than cool." |
| 8 | **Puddle** | Duckling | A flat beak and one hair tuft | "Would rather splash than stay dry." |
| 9 | **Burr** | Hedgehog | Spiky crown around the head | "Would rather be honest than polite." |
| 10 | **Mochi** | Cat | Triangle ears + a single forehead stripe | "Would rather be chased than chase." |
| 11 | **Beanie** | Bear cub | Two round ears on top | "Would rather hug it out." |
| 12 | **Rascal** | Raccoon | Round ears + a dark eye-mask band | "Would rather know the secret than keep it." |

**Watch at 22px:** Fen vs Mochi (both pointy ears; Fen's muzzle and Mochi's stripe must be clear) and Maple vs Beanie (both round ears; Maple's face markings must read). Test these first.

## Body colours (8 pastels, pick any critter in any colour → 96 combos)
Butter · Mint · Lilac · Peach · Sky-grey · Sage · Blush-sand · Cloud-white. _(Final hex values are a design task. Keep them clearly different from the option pink and blue.)_

## Moods (for the widget and results, like Raroque's hamster, `m5cRcii3pec @ 06:17`)
| Moment | Mood |
|---|---|
| Before the drop | 😴 Sleepy (eyes closed) |
| Question open, you haven't voted | 👀 Curious |
| You voted | 😄 Happy; bandana tints pink/blue |
| Rare pick (≤25%) | 😏 Smug / sparkle |
| You and your twin matched | 🫶 Heart eyes |

That's 5 expressions × 12 critters = 60 face variants. **MVP option:** start with just Sleepy + Happy (24 variants) and add the rest later.

## In onboarding (spec §12)
"**Pick your critter**": choose one of 12 → choose a colour → it waves hello → name yourself. This is Finch-style ownership from minute one (`research/avatar-case-study.md`).

## Later
Seasonal outfits (Halloween, winter, back-to-school), duo matching sets (D-015), and new critters added over time. Never remove one someone already picked (Netflix lesson).
