(() => {
  const board = document.querySelector("#split-flap");
  if (!board) return;

  const phrase = "TONO VIONO";
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const makeHalf = (position, character) => {
    const half = document.createElement("span");
    half.className = `tile-half tile-${position}`;
    const glyph = document.createElement("span");
    glyph.className = "glyph";
    glyph.textContent = character === " " ? "\u00a0" : character;
    half.append(glyph);
    return half;
  };

  const makeTile = (character, index) => {
    const tile = document.createElement("span");
    tile.className = "tile";
    tile.setAttribute("aria-hidden", "true");
    tile.dataset.index = String(index);
    tile.append(makeHalf("top", " "), makeHalf("bottom", " "));
    return tile;
  };

  const flipTo = (tile, character, delay) => {
    window.setTimeout(() => {
      const current = tile.querySelector(".tile-bottom .glyph");
      const next = character === " " ? "\u00a0" : character;
      const front = document.createElement("span");
      front.className = "tile-flap flap-front";
      const frontGlyph = document.createElement("span");
      frontGlyph.className = "glyph";
      frontGlyph.textContent = current.textContent;
      front.append(frontGlyph);

      const back = document.createElement("span");
      back.className = "tile-flap flap-back";
      const backGlyph = document.createElement("span");
      backGlyph.className = "glyph";
      backGlyph.textContent = next;
      back.append(backGlyph);
      tile.append(front, back);

      tile.querySelector(".tile-top .glyph").textContent = next;
      window.setTimeout(() => {
        tile.querySelector(".tile-bottom .glyph").textContent = next;
        front.remove();
        back.remove();
      }, 145);
    }, delay);
  };

  const tiles = [...phrase].map(makeTile);
  board.replaceChildren(...tiles);

  if (reducedMotion) {
    tiles.forEach((tile, index) => {
      const character = phrase[index] === " " ? "\u00a0" : phrase[index];
      tile.querySelector(".tile-top .glyph").textContent = character;
      tile.querySelector(".tile-bottom .glyph").textContent = character;
    });
    return;
  }

  const center = (tiles.length - 1) / 2;
  tiles.forEach((tile, index) => {
    const distance = Math.abs(index - center);
    const character = phrase[index];
    const startDelay = distance * 55;
    const randomFlips = character === " " ? 0 : 7;

    for (let flip = 0; flip < randomFlips; flip += 1) {
      const randomCharacter = charset[Math.floor(Math.random() * charset.length)];
      flipTo(tile, randomCharacter, startDelay + flip * 130);
    }

    flipTo(tile, character, startDelay + randomFlips * 130);
  });

  // When served by Next.js, continue to the real portfolio after the intro.
  // A file:// preview stays on this page so it can be inspected locally.
  if (window.location.protocol !== "file:") {
    window.setTimeout(() => window.location.replace("/"), 1900);
  }
})();
