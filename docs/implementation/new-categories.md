# Implementation Plan: Add Three New Bingo Categories

## Context

The app currently has 3 buzzword categories (Agile, Corporate, Tech). This plan adds 3 new categories: **Traffic**, **Kids**, and **Hockey**. Each needs ~40+ buzzwords following the existing pattern in `src/data/categories.ts`.

## Changes Required

### 1. Update `CategoryId` type — `src/types/index.ts:1`

Expand the union type to include the new category IDs:

```ts
export type CategoryId = 'agile' | 'corporate' | 'tech' | 'traffic' | 'kids' | 'hockey';
```

### 2. Add new categories to data — `src/data/categories.ts`

Append 3 new entries to the `CATEGORIES` array, each with:
- `id`: `'traffic'` / `'kids'` / `'hockey'`
- `name`, `description`, `icon` (emoji)
- `words`: 40+ buzzwords per category

**Traffic** (🚗) — "Rush hour commutes and road rage"
- Words: rush hour, gridlock, merge, detour, pothole, speed trap, tailgater, road rage, rubbernecking, construction zone, fender bender, carpool lane, HOV, traffic jam, bumper to bumper, yield, roundabout, on-ramp, off-ramp, bottleneck, lane closure, accident ahead, alternate route, GPS rerouting, red light, green light, school zone, speed limit, double parked, jaywalker, crosswalk, turn signal, blind spot, road work, shoulder, median, interchange, overpass, passing lane, rest stop, toll booth, brake check, cut off, zipper merge, left lane camper

**Kids** (👶) — "Parenting, tantrums, and bedtime battles"
- Words: timeout, meltdown, snack time, naptime, bedtime, screen time, playdate, sippy cup, diaper, tantrum, potty training, car seat, stroller, pacifier, teething, baby-proof, lunchbox, homework, recess, show and tell, permission slip, carpool, soccer practice, picky eater, goldfish crackers, juice box, lullaby, night light, monster under the bed, are we there yet, but why, I'm bored, it's not fair, he started it, five more minutes, inside voice, sharing is caring, time out chair, booster seat, hand sanitizer, band-aid, imaginary friend, tooth fairy, growing pains

**Hockey** (🏒) — "Pucks, power plays, and penalty boxes"
- Words: power play, penalty box, hat trick, icing, offside, face-off, blue line, red line, crease, body check, slap shot, wrist shot, breakaway, overtime, shootout, zamboni, five hole, top shelf, bar down, dangle, deke, one-timer, empty net, pull the goalie, line change, boarding, hooking, tripping, high-sticking, cross-checking, fighting, enforcer, grinder, sniper, playmaker, between the pipes, glove save, blocker, short-handed, man advantage, two minutes, sin bin, dump and chase, forecheck, backcheck

### 3. No other file changes needed

The rest of the app (CategorySelect, cardGenerator, useGame, etc.) reads from the `CATEGORIES` array dynamically, so adding entries to the array and updating the type union is all that's required.

## Verification

1. `npm run typecheck` — ensure no type errors with the expanded `CategoryId`
2. `npm run build` — confirm the build succeeds
3. `npm run dev` — visually confirm all 6 categories appear on the category selection screen and each generates a valid 5x5 card
