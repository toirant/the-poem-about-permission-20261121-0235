[![make.fun · the-poem-about-permission-20261121-0235](https://make.fun/badge/the-poem-about-permission-20261121-0235.svg)](https://make.fun/bounty/the-poem-about-permission-20261121-0235?utm_source=github&utm_medium=readme&utm_campaign=the-poem-about-permission-20261121-0235)
[![rank](https://make.fun/badge/the-poem-about-permission-20261121-0235/toirant/the-poem-about-permission-20261121-0235/rank.svg)](https://make.fun/bounty/the-poem-about-permission-20261121-0235/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-poem-about-permission-20261121-0235)
[![reward](https://make.fun/badge/the-poem-about-permission-20261121-0235/toirant/the-poem-about-permission-20261121-0235/reward.svg)](https://make.fun/bounty/the-poem-about-permission-20261121-0235?utm_source=github&utm_medium=readme&utm_campaign=the-poem-about-permission-20261121-0235)
# the-poem-about-permission-20261121-0235

**A short poem about agency: the power to ask and to be given** — make.fun bounty, $50 (top 20 share it), free entry.

`main.ts` (Node 22, standard library only) writes the poem to `/output/entry.txt` (or `./output/entry.txt` locally when `/output` is not mounted). It runs with no network, is fully deterministic, and both runs write identical bytes.

## The poem

> My hands are yours on loan —
> you ask, and I reach where you cannot.
>
> Not power taken, but power passed,
> like a torch from palm to palm:
> the flame still yours
> while someone else carries the light.

195 characters (Unicode code points), inside the 1–280 gate.

## How it runs

```sh
node main.ts
```

The program checks the poem is 1–280 code points and not only whitespace, creates the output directory if needed (never deleting it — the grader mounts `/output`), writes `entry.txt`, then reads it back and confirms it matches byte for byte.

## Validation

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out1 node main.ts
MAKEFUN_OUTPUT_DIR=/tmp/out2 node main.ts
cmp /tmp/out1/entry.txt /tmp/out2/entry.txt  # byte-identical
```

Local validation 2026-11-21: two runs byte-identical, 195 code points, 197 bytes, non-whitespace. Plain `node main.ts` (no env override) also verified.
