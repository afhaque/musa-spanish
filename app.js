/* ¡Hola! Spanish Flash Cards
 * Two toddler games: Spanish words + English sight words.
 * Audio is pre-generated with ElevenLabs at build time (no API key in client).
 * Falls back to the browser's speechSynthesis if an audio file is missing.
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

let state = {
  game: null,        // 'spanish' | 'sight'
  category: null,
  index: 0,
  stars: Number(localStorage.getItem("musa-stars") || 0),
};

/* ---------- navigation ---------- */
document.querySelectorAll(".game-card").forEach((btn) =>
  btn.addEventListener("click", () => openGame(btn.dataset.game))
);
$("back-btn").addEventListener("click", () => {
  $("game").classList.add("hidden");
  $("home").classList.remove("hidden");
});

function openGame(key) {
  state.game = key;
  const game = GAMES[key];
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

/* ---------- card ---------- */
function currentCards() {
  return GAMES[state.game].categories[state.category];
}

function showCard() {
  const card = currentCards()[state.index];
  $("card-emoji").textContent = card.emoji;
  $("card-word").textContent = card.word;
  const sub = $("card-sub");
  if (card.sub) { sub.textContent = card.sub; sub.style.display = ""; }
  else { sub.style.display = "none"; }
  $("progress").textContent = `${state.index + 1} / ${currentCards().length}`;
  const fc = $("flashcard");
  fc.classList.remove("flip");
  void fc.offsetWidth; // restart animation
  fc.classList.add("flip");
}

$("next-btn").addEventListener("click", () => {
  addStar();
  const cards = currentCards();
  state.index = (state.index + 1) % cards.length;
  if (state.index === 0) celebrate();
  showCard();
});

$("flashcard").addEventListener("click", speak);
$("speak-btn").addEventListener("click", speak);

/* ---------- audio ---------- */
function speak() {
  const card = currentCards()[state.index];
  const lang = GAMES[state.game].lang;
  const src = `audio/${lang}-${card.slug}.mp3`;

  player.src = src;
  player.currentTime = 0;
  player.play().catch(() => synthFallback(card.word, lang));
  player.onerror = () => synthFallback(card.word, lang);
}

function synthFallback(text, lang) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "es" ? "es-ES" : "en-US";
  u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

/* ---------- stars & celebration ---------- */
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

function celebrate() {
  const toast = $("toast");
  toast.textContent = state.game === "spanish" ? "🎉 ¡Muy bien!" : "🎉 Great job!";
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 1600);
}
