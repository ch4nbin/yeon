# Visual direction

This document records the visual direction the user has provided. Keep the interface
minimal and use the references as inspiration for Yeon rather than reproducing them.

## Theme and mood

Sakura-inspired with restrained East Asian cues. The page should feel quiet and
considered, not ornamental. Use a small sakura mark as the distinctive visual detail.
Follow the Kaji screenshot's sparse centered composition while applying Yeon's own
palette and copy. Use the user-provided `yeonhero-hq.png` as the full-viewport background;
keep its blossom tree visible on the right and preserve the light open space behind the
dictionary entry for readable text.

## Color palette

Use the palette from the user's reference image. Exact names and hex values:

| Name | Hex | RGB |
|---|---|---|
| Muddy Mauve | `#E3B6CB` | `227, 182, 203` |
| Palace Arms | `#44466B` | `68, 70, 107` |
| Kir Royale Rose | `#B55878` | `181, 88, 120` |
| Mountain Heather | `#F1DBE4` | `241, 219, 228` |

Specific semantic roles for the colors have not been assigned; choose those when the
interface is designed and check contrast/accessibility.

## Typography and layout

Use a narrow centered dictionary entry, warm serif wordmark, quiet monospace links,
generous negative space, and concise copy. The loaded landing page should stay as
minimal as the reference; do not add a marketing hero or extra explanatory sections.

## Interaction and motion

For the loading/intro state, replace the Kaji ASCII wordmark with a sakura decal and the
name **Yeon**. Keep it brief and visually quiet. Motion details remain open; consult
`.agents/skills/emil-design-eng/SKILL.md` before implementing animation.

## Reference sites

Record the site and the specific page or interaction the user likes, plus what should
inspire Yeon (for example, navigation, density, color, or motion).

- [Kaji landing page](https://kaji.build/): visual and interaction reference for the landing page and frontend. The user-provided screenshot shows a minimal dictionary entry with a centered content column, small navigation/install links, and abundant empty space.
- [Kaji source repository](https://github.com/enkyuan/kaji): direct project reference requested by the user.

Adapt the minimal dictionary presentation to Yeon's own name, product, and palette.

## Landing-page copy (working draft)

Use a two-entry dictionary-style introduction. Preserve the first definition exactly as
provided:

1. **연 (緣)** *n.* a bond between people, attributed to fate rather than choice.
2. **Yeon** *n.* an in-process SDK and runtime for reliable, typed handoffs between AI agents.

The second entry describes the current product direction and should be revised if the
architecture changes. The landing page uses Next.js App Router with TypeScript; keep
this frontend framework unless the user changes that direction.

## Constraints and avoidances

Minimal first; the sakura mark and supplied palette are the explicit visual accents.
Other constraints can be added as the user shares them.
