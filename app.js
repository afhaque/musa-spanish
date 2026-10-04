/* ¡Hola! Spanish Flash Cards
 * Two toddler games: Spanish words + English sight words.
 * - Built-in word audio is pre-generated with ElevenLabs at build time (no key in client).
 * - Custom (LLM-added) words live in localStorage and use the device voice
 *   (speechSynthesis), since no ElevenLabs audio exists for them.
 * - Flip cards: front = word only, back = picture (+ translation).
 */

const GAMES = {
  spanish: {
    title: "¡Hola! Spanish",
    lang: "es",
    speakColor: "green",
    hint: "tap the green button to hear it!",
    categories: {
      "Animals": [
        { word: "el perro",    sub: "the dog",    emoji: "🐶", slug: "perro" },
        { word: "el gato",     sub: "the cat",    emoji: "🐱", slug: "gato" },
        { word: "el pez",      sub: "the fish",   emoji: "🐟", slug: "pez" },
        { word: "el pájaro",   sub: "the bird",   emoji: "🐦", slug: "pajaro" },
        { word: "el caballo",  sub: "the horse",  emoji: "🐴", slug: "caballo" },
        { word: "la vaca",     sub: "the cow",    emoji: "🐄", slug: "vaca" },
        { word: "el conejo",   sub: "the rabbit", emoji: "🐰", slug: "conejo" },
        { word: "el pato",     sub: "the duck",   emoji: "🦆", slug: "pato" },
      ],
      "Food": [
        { word: "la manzana",  sub: "the apple",  emoji: "🍎", slug: "manzana" },
        { word: "el pan",      sub: "the bread",  emoji: "🍞", slug: "pan" },
        { word: "la leche",    sub: "the milk",   emoji: "🥛", slug: "leche" },
        { word: "el queso",    sub: "the cheese", emoji: "🧀", slug: "queso" },
        { word: "el huevo",    sub: "the egg",    emoji: "🍳", slug: "huevo" },
        { word: "la banana",   sub: "the banana", emoji: "🍌", slug: "banana" },
        { word: "el jugo",     sub: "the juice",  emoji: "🧃", slug: "jugo" },
        { word: "la fresa",    sub: "the strawberry", emoji: "🍓", slug: "fresa" },
      ],
      "Colors": [
        { word: "rojo",     sub: "red",    emoji: "❤️", slug: "rojo" },
        { word: "azul",     sub: "blue",   emoji: "💙", slug: "azul" },
        { word: "verde",    sub: "green",  emoji: "💚", slug: "verde" },
        { word: "amarillo", sub: "yellow", emoji: "💛", slug: "amarillo" },
        { word: "naranja",  sub: "orange", emoji: "🧡", slug: "naranja" },
        { word: "morado",   sub: "purple", emoji: "💜", slug: "morado" },
        { word: "rosa",     sub: "pink",   emoji: "🩷", slug: "rosa" },
        { word: "negro",    sub: "black",  emoji: "🖤", slug: "negro" },
      ],
      "Shapes": [
        { word: "el círculo",    sub: "the circle",   emoji: "🔵", slug: "circulo" },
        { word: "el cuadrado",   sub: "the square",   emoji: "🟦", slug: "cuadrado" },
        { word: "el triángulo",  sub: "the triangle", emoji: "🔺", slug: "triangulo" },
        { word: "la estrella",   sub: "the star",     emoji: "⭐", slug: "estrella" },
        { word: "el corazón",    sub: "the heart",    emoji: "❤️", slug: "corazon" },
        { word: "el rombo",      sub: "the diamond",  emoji: "🔶", slug: "rombo" },
        { word: "la luna",       sub: "the moon",     emoji: "🌙", slug: "luna" },
        { word: "la cruz",       sub: "the cross",    emoji: "➕", slug: "cruz" },
      ],
    },
  },
  sight: {
    title: "Sight Words",
    lang: "en",
    speakColor: "orange",
    hint: "tap the orange button to hear it!",
    categories: {
      "Animals": [
        { word: "dog",   emoji: "🐶", slug: "dog" },
        { word: "cat",   emoji: "🐱", slug: "cat" },
        { word: "duck",  emoji: "🦆", slug: "duck" },
        { word: "fish",  emoji: "🐟", slug: "fish" },
        { word: "bird",  emoji: "🐦", slug: "bird" },
        { word: "pig",   emoji: "🐷", slug: "pig" },
        { word: "cow",   emoji: "🐄", slug: "cow" },
        { word: "horse", emoji: "🐴", slug: "horse" },
        { word: "frog",  emoji: "🐸", slug: "frog" },
        { word: "bear",  emoji: "🐻", slug: "bear" },
        { word: "lion",  emoji: "🦁", slug: "lion" },
        { word: "bee",   emoji: "🐝", slug: "bee" },
      ],
      "Food": [
        { word: "apple",  emoji: "🍎", slug: "apple" },
        { word: "milk",   emoji: "🥛", slug: "milk" },
        { word: "egg",    emoji: "🥚", slug: "egg" },
        { word: "bread",  emoji: "🍞", slug: "bread" },
        { word: "cheese", emoji: "🧀", slug: "cheese" },
        { word: "juice",  emoji: "🧃", slug: "juice" },
        { word: "banana", emoji: "🍌", slug: "banana" },
        { word: "cake",   emoji: "🍰", slug: "cake" },
        { word: "cookie", emoji: "🍪", slug: "cookie" },
        { word: "pizza",  emoji: "🍕", slug: "pizza" },
        { word: "rice",   emoji: "🍚", slug: "rice" },
        { word: "corn",   emoji: "🌽", slug: "corn" },
      ],
      "Things": [
        { word: "ball",  emoji: "⚽", slug: "ball" },
        { word: "book",  emoji: "📖", slug: "book" },
        { word: "car",   emoji: "🚗", slug: "car" },
        { word: "cup",   emoji: "🥤", slug: "cup" },
        { word: "hat",   emoji: "🎩", slug: "hat" },
        { word: "shoe",  emoji: "👟", slug: "shoe" },
        { word: "bed",   emoji: "🛏️", slug: "bed" },
        { word: "toy",   emoji: "🧸", slug: "toy" },
        { word: "sun",   emoji: "☀️", slug: "sun" },
        { word: "moon",  emoji: "🌙", slug: "moon" },
        { word: "star",  emoji: "⭐", slug: "star" },
        { word: "tree",  emoji: "🌳", slug: "tree" },
      ],
      "Colors": [
        { word: "red",     emoji: "🔴", slug: "red" },
        { word: "blue",    emoji: "🔵", slug: "blue" },
        { word: "green",   emoji: "🟢", slug: "green" },
        { word: "yellow",  emoji: "🟡", slug: "yellow" },
        { word: "orange",  emoji: "🟠", slug: "orange" },
        { word: "purple",  emoji: "🟣", slug: "purple" },
        { word: "pink",    emoji: "🩷", slug: "pink" },
        { word: "black",   emoji: "⚫", slug: "black" },
        { word: "white",   emoji: "⚪", slug: "white" },
        { word: "brown",   emoji: "🟤", slug: "brown" },
        { word: "gray",    emoji: "🩶", slug: "gray" },
        { word: "rainbow", emoji: "🌈", slug: "rainbow" },
      ],
    },
  },
};

const $ = (id) => document.getElementById(id);
const player = $("player");
const CUSTOM_KEY = "musa-custom-words";
const MAX_CUSTOM_WORDS = 200;

let state = {
  game: null,        // 'spanish' | 'sight'
  category: null,
  index: 0,
  stars: Number(localStorage.getItem("musa-stars") || 0),
};

/* ---------- navigation ---------- */
document.querySelectorAll(".game-card").forEach((btn) =>
  btn.addEventListener("click", () => { stopAudio(); openGame(btn.dataset.game); })
);
$("back-btn").addEventListener("click", () => {
  stopAudio();
  $("game").classList.add("hidden");
  $("home").classList.remove("hidden");
});

function openGame(key) {
  state.game = key;
  const game = GAMES[key];
  document.documentElement.lang = game.lang;
  $("game-title").textContent = game.title;
  $("hint").textContent = game.hint;
  $("speak-btn").className = "speak-btn " + game.speakColor;
  renderStars();
  renderTabs(Object.keys(game.categories));
  selectCategory(Object.keys(game.categories)[0]);
  $("home").classList.add("hidden");
  $("game").classList.remove("hidden");
}

function renderTabs(names) {
  const nav = $("tabs");
  nav.innerHTML = "";
  names.forEach((name) => {
    const b = document.createElement("button");
    b.className = "tab";
    b.textContent = name;
    b.addEventListener("click", () => selectCategory(name));
    nav.appendChild(b);
  });
}

function selectCategory(name) {
  state.category = name;
  state.index = 0;
  document.querySelectorAll(".tab").forEach((t) =>
    t.classList.toggle("active", t.textContent === name)
  );
  showCard();
}

/* ---------- flip card ---------- */
function currentCards() {
  return GAMES[state.game].categories[state.category];
}

function showCard() {
  const card = currentCards()[state.index];
  const isSpanish = state.game === "spanish";
  const fc = $("flashcard");
  fc.classList.remove("flipped");          // always land front-side up

  // Spanish: front = image + English word, back = Spanish word (the answer).
  // Sight words: front = English word, back = image (+ word for reinforcement).
  const frontEmoji = $("card-front-emoji");
  frontEmoji.style.display = isSpanish ? "" : "none";
  frontEmoji.textContent = card.emoji;
  $("card-word").textContent = isSpanish ? (card.sub || card.word) : card.word;

  const backEmoji = $("card-emoji");
  backEmoji.style.display = isSpanish ? "none" : "";
  backEmoji.textContent = card.emoji;
  const backWord = $("card-back-word");
  backWord.textContent = card.word;
  backWord.classList.toggle("card-word-small", !isSpanish);
  const sub = $("card-sub");
  sub.style.display = "none";

  $("progress").textContent = `${state.index + 1} / ${currentCards().length}`;
  fc.classList.remove("deal");
  void fc.offsetWidth; // restart deal animation
  fc.classList.add("deal");
}

$("flashcard").addEventListener("click", () => {
  $("flashcard").classList.toggle("flipped");
});

$("next-btn").addEventListener("click", () => {
  addStar();
  const cards = currentCards();
  state.index = (state.index + 1) % cards.length;
  showCard();
  if (state.index === 0 && cards.length > 1) celebrate();
});

$("speak-btn").addEventListener("click", speak);

/* ---------- audio ---------- */
let fallbackFired = false;

function stopAudio() {
  player.pause();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function speak() {
  const card = currentCards()[state.index];
  const lang = GAMES[state.game].lang;
  const src = `audio/${lang}-${card.slug}.mp3`;

  fallbackFired = false;
  const onFail = () => {
    if (fallbackFired) return;
    fallbackFired = true;
    synthFallback(card.word, lang);
  };
  player.onerror = onFail;
  player.src = src;
  player.currentTime = 0;
  player.play().catch(onFail);
}

function synthFallback(text, lang) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "es" ? "es-ES" : "en-US";
  u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

/* ---------- stars ---------- */
function renderStars() {
  $("star-count").textContent = state.stars;
}

function addStar() {
  state.stars += 1;
  localStorage.setItem("musa-stars", String(state.stars));
  renderStars();
  const el = document.querySelector(".stars");
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

/* ---------- celebration (own page) ---------- */
function celebrate() {
  $("celebrate-title").textContent = state.game === "spanish" ? "¡Muy bien!" : "Great job!";
  $("celebrate-sub").textContent = `You finished ${state.category}!`;
  $("celebrate-count").textContent = state.stars;
  $("celebrate").classList.remove("hidden");
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(
      state.game === "spanish" ? "¡Muy bien!" : "Great job!"
    );
    u.lang = state.game === "spanish" ? "es-ES" : "en-US";
    speechSynthesis.speak(u);
  }
}

$("celebrate-next").addEventListener("click", () => {
  $("celebrate").classList.add("hidden");
});

/* ============================================================
 * Add-more-words: LLM chat that expands categories/word counts.
 * The LLM key lives only in this browser's localStorage and is
 * sent only to the configured API base URL (Authorization header).
 * LLM-provided text is rendered exclusively via textContent.
 * ============================================================ */

function slugify(word) {
  return word
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")   // strip accents
    .replace(/^(el|la|los|las|un|una|the)\s+/, "") // strip leading article
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 32);
}

function loadCustom() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || {}; }
  catch { return {}; }
}

function saveCustom(custom) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom));
}

function countCustom(custom) {
  let n = 0;
  for (const g of Object.values(custom))
    for (const cards of Object.values(g)) n += cards.length;
  return n;
}

/* Merge custom words into GAMES. Returns {added, skipped} counts.
 * Accepts shape { spanish: {Cat: [{word, sub?, emoji}]}, sight: {...} }
 * Limits: MAX_CUSTOM_WORDS enforced per word; reserved/prototype-chain
 * category names rejected; slugs deduped across the whole game (audio URLs
 * are slug-keyed, so a cross-category dup would collide). */
const RESERVED_NAMES = new Set(["__proto__", "constructor", "prototype", "hasOwnProperty", "toString", "valueOf"]);

function graphemes(s) {
  if (typeof Intl !== "undefined" && Intl.Segmenter)
    return [...new Intl.Segmenter().segment(s)].map((x) => x.segment);
  return [...s];
}

function slugInGame(gameKey, slug) {
  return Object.values(GAMES[gameKey].categories).some((cards) =>
    Array.isArray(cards) && cards.some((c) => c.slug === slug)
  );
}

function mergeWords(payload, custom) {
  let added = 0, skipped = 0;
  for (const gameKey of ["spanish", "sight"]) {
    const cats = payload[gameKey];
    if (!cats || typeof cats !== "object" || Array.isArray(cats)) continue;
    for (const [catName, words] of Object.entries(cats)) {
      if (!Array.isArray(words)) continue;
      const cleanCat = String(catName).slice(0, 24).trim();
      if (!cleanCat || RESERVED_NAMES.has(cleanCat)) { skipped += words.length; continue; }
      if (!Object.hasOwn(GAMES[gameKey].categories, cleanCat)) GAMES[gameKey].categories[cleanCat] = [];
      if (!Object.hasOwn(custom, gameKey)) custom[gameKey] = {};
      if (!Object.hasOwn(custom[gameKey], cleanCat)) custom[gameKey][cleanCat] = [];
      for (const w of words) {
        if (countCustom(custom) >= MAX_CUSTOM_WORDS) { skipped++; continue; }
        if (!w || typeof w.word !== "string" || typeof w.emoji !== "string") { skipped++; continue; }
        const word = w.word.trim().slice(0, 40);
        const emoji = graphemes(w.emoji.trim()).slice(0, 4).join("");
        const sub = typeof w.sub === "string" ? w.sub.trim().slice(0, 40) : undefined;
        const slug = slugify(word);
        if (!word || !emoji || !slug) { skipped++; continue; }
        if (slugInGame(gameKey, slug)) { skipped++; continue; }
        const card = gameKey === "spanish"
          ? { word, sub: sub || "", emoji, slug }
          : { word, emoji, slug };
        GAMES[gameKey].categories[cleanCat].push(card);
        custom[gameKey][cleanCat].push(gameKey === "spanish" ? { word, sub: card.sub, emoji } : { word, emoji });
        added++;
      }
      // an all-duplicate/invalid response must not leave an empty tab behind
      if (GAMES[gameKey].categories[cleanCat].length === 0) delete GAMES[gameKey].categories[cleanCat];
      if (custom[gameKey][cleanCat].length === 0) delete custom[gameKey][cleanCat];
    }
  }
  return { added, skipped };
}

/* Re-apply persisted custom words on load */
(function applyStoredCustom() {
  const stored = loadCustom();
  if (!stored || typeof stored !== "object") return;
  const fresh = {};
  mergeWords(stored, fresh); // rebuilds GAMES; 'fresh' mirrors stored (dedup vs built-ins)
  saveCustom(fresh);
})();

/* ---------- sheet UI ---------- */
$("addwords-btn").addEventListener("click", () => {
  openSheet();
});
$("sheet-close").addEventListener("click", closeSheet);
$("sheet").addEventListener("click", (e) => { if (e.target === $("sheet")) closeSheet(); });

function openSheet() {
  const unlocked = !!sessionStorage.getItem("musa-pw");
  $("pw-gate").classList.toggle("hidden", unlocked);
  $("chat-ui").classList.toggle("hidden", !unlocked);
  $("pw-error").classList.add("hidden");
  $("pw-input").value = "";
  if (unlocked && !$("chat-log").children.length) {
    botSay('Tell me what words to add! For example:\n• "add 6 ocean animals in Spanish"\n• "add 8 more sight words about home"\n• "make a new Spanish category for family members"');
  }
  $("sheet").classList.remove("hidden");
}

function closeSheet() {
  $("sheet").classList.add("hidden");
  // if words were added while a game was open, refresh the tab bar
  if (!$("game").classList.contains("hidden") && state.game) {
    renderTabs(Object.keys(GAMES[state.game].categories));
    document.querySelectorAll(".tab").forEach((t) =>
      t.classList.toggle("active", t.textContent === state.category)
    );
  }
}

function chatMsg(text, cls) {
  const div = document.createElement("div");
  div.className = "chat-msg " + cls;
  div.textContent = text;   // textContent only — LLM output is never injected as HTML
  $("chat-log").appendChild(div);
  $("chat-log").scrollTop = $("chat-log").scrollHeight;
  return div;
}
const botSay = (t) => chatMsg(t, "bot");

/* ---------- password gate (enforced server-side by /api/words) ---------- */
$("pw-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const pw = $("pw-input").value;
  if (!pw) return;
  try {
    const res = await fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, check: true }),
    });
    if (res.ok) {
      sessionStorage.setItem("musa-pw", pw);
      openSheet();
    } else {
      $("pw-error").classList.remove("hidden");
    }
  } catch {
    $("pw-error").textContent = "couldn't reach the server — try again";
    $("pw-error").classList.remove("hidden");
  }
});

$("lock-btn").addEventListener("click", () => {
  sessionStorage.removeItem("musa-pw");
  openSheet();
});

/* ---------- LLM chat (via /api/words — Kimi key stays server-side) ---------- */
$("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = $("chat-input");
  const text = input.value.trim();
  if (!text) return;
  const pw = sessionStorage.getItem("musa-pw");
  if (!pw) { openSheet(); return; }

  input.value = "";
  chatMsg(text, "user");
  const thinking = botSay("thinking… 🤔");

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 70000);
    const res = await fetch("/api/words", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, message: text }),
    });
    clearTimeout(timer);
    if (res.status === 401) {
      sessionStorage.removeItem("musa-pw");
      thinking.remove();
      openSheet();
      $("pw-error").classList.remove("hidden");
      return;
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `server error ${res.status}`);
    }
    const data = await res.json();
    const content = data.content || "";

    // tolerate the model wrapping JSON in prose or fences
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("The model didn't return JSON. Try rephrasing.");
    const payload = JSON.parse(match[0]);

    const custom = loadCustom();
    if (countCustom(custom) >= MAX_CUSTOM_WORDS) {
      thinking.remove();
      botSay(`You've hit the ${MAX_CUSTOM_WORDS}-word custom limit. Copy your words to Spock to bake them in, then reset.`);
      return;
    }
    const { added, skipped } = mergeWords(payload, custom);
    saveCustom(custom);
    thinking.remove();

    if (added === 0) {
      botSay(skipped > 0
        ? `Nothing new to add — ${skipped} word(s) were duplicates or invalid. Try a different theme!`
        : "I couldn't find any words in that reply. Try again?");
    } else {
      const names = [];
      for (const g of ["spanish", "sight"])
        for (const [cat, words] of Object.entries(payload[g] || {}))
          if (Array.isArray(words) && words.length) names.push(`${cat} (${GAMES[g].title})`);
      botSay(`Added ${added} new word(s) ✅${names.length ? "\nCategories: " + names.join(", ") : ""}${skipped ? `\n(${skipped} duplicates skipped)` : ""}\nThey use the device voice — copy them to Spock for ElevenLabs audio.`);
    }
  } catch (err) {
    thinking.remove();
    const msg = err.name === "AbortError"
      ? "The request timed out — the model is busy, try again."
      : `Couldn't add words: ${err.message}`;
    chatMsg(msg, "bot error");
  }
});

/* ---------- export / reset ---------- */
$("export-words").addEventListener("click", async () => {
  const custom = loadCustom();
  const json = JSON.stringify(custom, null, 2);
  if (countCustom(custom) === 0) { botSay("No custom words yet — ask me to add some first!"); return; }
  try {
    await navigator.clipboard.writeText(json);
    botSay("Copied! 📋 Paste it to Spock (or in the repo) to bake these words in with ElevenLabs audio.");
  } catch {
    botSay("Clipboard blocked. Here is your JSON — long-press to copy:\n" + json.slice(0, 1500));
  }
});

$("reset-words").addEventListener("click", () => {
  localStorage.removeItem(CUSTOM_KEY);
  botSay("Custom words cleared 🗑 Reloading…");
  setTimeout(() => location.reload(), 900);
});
