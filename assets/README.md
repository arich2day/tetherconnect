# assets/ — demo capture files

The dormant "The real thing" section on `demo.html` (search for `TODO(demo-capture)`) is wired to exactly these four files. Drop them in with these exact names, then uncomment that section:

| File | What it is |
|---|---|
| `tether-connect-demo.webm` | The live screen recording (video/webm). **Must be under 50 MB** — GitHub Pages does not serve Git LFS objects, so the file has to be a plain Git blob. |
| `shot-1-overview.png` | Poster frame for the video: the Overwatch console overview. |
| `shot-2-events.png` | Still of the events view — real blocked and allowed requests. |
| `shot-3-access.png` | Still of the just-in-time approval queue. |

No other step is needed: the section's CSS is already live in `demo.html`.

## Founder photo

The founder section on `about.html` is live and references one image:

| File | What it is |
|---|---|
| `founder-alvin-richburg.jpeg` | Headshot of Alvin Richburg. Rendered 1:1 with `object-fit: cover`, top-anchored, so a portrait crop frames the face. Keep it a plain Git blob (no LFS). |

If this file is missing the section still renders cleanly — it falls back to an "AR" monogram tile in place of the photo, so nothing looks broken.
