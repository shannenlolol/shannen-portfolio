// Makes the small copies of the site's photos that pages show (see src/displayImage.ts). The originals are up to
// 2000px wide and 2 MB, far more than a print a few hundred pixels wide needs, so each is copied at most 1200px wide
// as WebP into public/assets/display, mirroring its path. The originals stay for the lightbox. Runs before `dev` and
// `build`; a copy newer than its original is left alone. The copies are build output, so they are not committed.
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const SOURCE = "public/assets/images";
const OUTPUT = "public/assets/display";
const WIDTH = 1200;

async function* photos(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    // Logos and badges are already small and shown as-is.
    if (entry.isDirectory()) {
      if (entry.name !== "logos") yield* photos(path);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) yield path;
  }
}

const modified = (path) => stat(path).then((info) => info.mtimeMs, () => 0);

let made = 0;
for await (const source of photos(SOURCE)) {
  const target = join(OUTPUT, relative(SOURCE, source)).replace(/\.(jpe?g|png)$/i, ".webp");
  if ((await modified(target)) >= (await modified(source))) continue;
  await mkdir(dirname(target), { recursive: true });
  // rotate() applies the camera's orientation before the metadata is dropped.
  await sharp(source).rotate().resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
  made++;
}
console.log(`display images: ${made} made`);
