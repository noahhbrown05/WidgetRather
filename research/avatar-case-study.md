# Avatar Case Study: designed profile icons

_2026-09-11, Noah's request: "a set of icon characters for profiles… based on an entire system of something correlated… pastel icons of different animals… or aliens." The MVP spec already says **no photos; emoji/colour avatars** (MVP-SPEC §8). This upgrades that to a designed character system. Design is Noah's area (D-017); this is research to start from._

## The case studies

| App | The system | What makes it work | Lesson for us |
|---|---|---|---|
| **Google Docs "Anonymous Animals"** | Anonymous viewers show up as "Anonymous Capybara", "Anonymous Axolotl"… **73 animals**, grown over time to include mythical creatures and memes (Nyan Cat, Kraken) ([Mental Floss](https://www.mentalfloss.com/article/545860/wild-things-why-google-docs-feature-anonymous-animals), [googlesystem](http://googlesystem.blogspot.com/2013/04/anonymous-animals-in-google-drive.html)) | A **correlated family** (all animals, one style) + a **name attached to each** = instant identity without a photo | Name every character. "Capy" is more lovable than "avatar #7" |
| **Netflix profile icons** | Started as a handful of colourful cartoon faces; later added character sets from its shows; **retires old icons and rotates new ones in** ([TWFLD](https://twfld.com/netflix-revamps-profile-icons-with-show-characters-design/), [What's on Netflix](https://www.whats-on-netflix.com/news/missing-your-old-netflix-profile-icon-this-extension-restores-over-500-retired-avatars/)) | **Themed sets + rotation** keep it fresh; people got attached enough that someone built an extension to restore 500+ retired icons | Plan **seasonal/limited sets** (holiday, school year), but don't take away someone's current avatar |
| **Notion Faces** (made with studio BUCK) | A **modular avatar builder**: 16 face shapes, 14 eyes, 20 mouths, 58 hairstyles… all hand-drawn in one art director's style ([BUCK](https://buck.co/work/notion-faces)) | **"Expressiveness… instead of physical likeness"**: playful, inclusive, one consistent hand | A few swappable parts × one style = many unique combos from little art |
| **Duolingo** | A whole cast (Duo, Lily, Zari…) built from **just three basic shapes (rounded rectangle, circle, rounded triangle)**, heavy consistent strokes, no sharp right angles, saturated colours; each character has a **personality** ([Duolingo blog](https://blog.duolingo.com/shape-language-duolingos-art-style/), [Duolingo design](https://design.duolingo.com/illustration/characters)) | **Strict shape rules** make many characters feel like one family | Write our **shape rules** first, then draw characters inside them |
| **Among Us** | Bean-shaped crewmates told apart **only by colour**; no face, just a visor ([AppleGazette](https://www.applegazette.com/blog/the-ultimate-guide-to-every-among-us-character-colors-roles-and-secrets/), [Sportskeeda](https://www.sportskeeda.com/among-us/news-among-us-crewmate-concept-art-shows)) | **Silhouette + solid colour** reads instantly at tiny sizes; blank faces let people **project personality** onto them | Our widget shows avatars at ~22px, so **colour + silhouette must carry identity**, not detail. (Don't copy the crewmate shape: it's Innersloth's character.) |
| **Finch** (self-care pet) | You **hatch, name, and pick a personality** for your bird on day one; dress it up; **the widget shows your pet, and it changes as it evolves or the seasons change** ([Deconstructor of Fun](https://www.deconstructoroffun.com/blog/x0hd2ssr80y5n7gv0w967pg7hwd7tl), [Pratt IXD](https://ixd.prattsi.org/2026/02/design-critique-finch-self-care-pet-ios-app/)) | **Ownership from minute one** + a widget that reflects your character = emotional investment; inclusive options (pride flags, mobility aids) | Make picking your character a **moment in onboarding**, not a settings field |
| **Raroque's Ellie widget** | A hamster character whose **mood changes with the time of day and your progress**; he calls it "its own little world" (`m5cRcii3pec @ 06:17`) | A character that **reacts to state** makes a widget feel alive | Characters can react on the widget: sleepy before the drop, excited after you vote |

## Principles to carry over
1. **One shape language, many characters** (Duolingo, Notion).
2. **Readable at 22px:** silhouette + colour first, detail last (Among Us). The large widget shows 4 avatars in tiny circles.
3. **Personality over likeness:** fits our no-photos rule and is safer for teens (Notion, Among Us).
4. **Every character has a name and a vibe** (Google, Duolingo).
5. **Ownership moment in onboarding** (Finch).
6. **Fresh drops over time**, never removing what someone chose (Netflix).
7. **Tiny files:** simple vector shapes, not detailed images (widget memory, `9sHd-VWssxw @ 02:04`).

## A system idea that's ours: "your pick tints your avatar"
Our two options are already colour-coded: **pink = option A, blue = option B** (from the mockups; see Greg's session 2026-09-10). If every avatar is a **pastel character whose accent colour takes on the colour of the side you picked today**, the results screen shows *who picked what at a glance*, with no labels needed. Friends' faces turn pink or blue after the reveal. This works with any of the directions below.

## Three directions (Noah picked **A. Pastel Critters**, D-016)

**A. Pastel Critters:** ~12 animals (capybara, axolotl, frog, bunny, fox…), all built from one soft bean/blob base shape, each with a one-line "would you rather" personality ("Capy: would rather nap than anything").
- ✅ Warm and cute; works for couples/duos (D-015); easy to love.
- ⚠️ Animal avatars are common (Google, Finch, Duolingo), so they're harder to make ownable.

**B. The Rathers (aliens), my recommendation:** small pastel aliens that "came to Earth to study the choices humans make". Same blob base; each has **one signature trait** (one eye / three eyes / antenna / horns / halo ring) plus a name.
- ✅ **A brand story, not just icons:** the Split meter becomes "*the planet* split 51/49", the Rare pick becomes "only 18% of Earthlings chose this", and the widget can show your Rather sleeping before the drop.
- ✅ More ownable than animals; fits a teen + university vibe.
- ⚠️ Needs a strong illustrator hand to avoid looking generic.

**C. Mood Blobs:** abstract soft shapes with faces; expression changes with state (sleepy before the drop, excited after voting, smug on a "rare pick").
- ✅ The simplest to draw, the smallest files, and animation-friendly.
- ⚠️ Least character-rich; less collectible.

## Suggested MVP scope for avatars
- **12 characters × 8 pastel colours = 96 combos**, plus the pick-tint rule. That's enough variety for big communities without a builder.
- Picked during onboarding (spec §12: "display name + avatar").
- **Later:** seasonal sets, unlockables for duo streaks, a Notion-style builder.

## Open questions
1. ~~Direction~~: **Pastel Critters** chosen (D-016). Roster draft: `design/critters.md`.
2. Who draws them: Noah with Claude Design for exploration, or a hired illustrator? (Claude Design shares Pro usage limits, so plan for it.)
3. Does the pick-tint rule work with the colour-blind-friendly contrast we need? (Noah to check.)
