/* The Meridian Times — script.js (vanilla JS, no dependencies) */
"use strict";

/* ---------- Data ---------- */
const CATS = [
  "Technology",
  "Business",
  "Politics",
  "Entertainment",
  "Lifestyle",
  "Sports",
];
// [category, title, description, image seed] — ordered newest first
const RAW = [
  [
    "Technology",
    "The Quiet Revolution: How On-Device AI Is Reshaping Everyday Work",
    "Smaller, faster models are moving from the cloud into our pockets, changing privacy, speed and cost for millions of users.",
    "circuit-ai",
  ],
  [
    "Business",
    "Global Markets Rally as Inflation Cools Faster Than Expected",
    "Investors welcome softer price data, with analysts predicting a more stable outlook for the year ahead.",
    "stock-market",
  ],
  [
    "Politics",
    "Leaders Gather for Landmark Climate Finance Summit",
    "Delegates from over 90 nations negotiate funding commitments aimed at accelerating the clean energy transition.",
    "summit-hall",
  ],
  [
    "Entertainment",
    "Streaming Giants Bet Big on Short-Form Original Series",
    "Bite-sized storytelling is winning over mobile audiences and reshaping how studios plan their slates.",
    "cinema-lights",
  ],
  [
    "Lifestyle",
    "The Case for Slow Travel: Fewer Places, Deeper Experiences",
    "More travelers are trading packed itineraries for longer stays, local cuisine and meaningful connections.",
    "travel-road",
  ],
  [
    "Sports",
    "Underdogs Stun Favorites in Thrilling Championship Semifinal",
    "A last-minute goal sends the crowd into a frenzy and sets up a dream final this weekend.",
    "stadium-night",
  ],
  [
    "Technology",
    "Inside the Race to Build Greener Data Centers",
    "Operators turn to liquid cooling and renewable contracts as AI demand strains power grids worldwide.",
    "server-room",
  ],
  [
    "Business",
    "Why Founder-Led Companies Are Outperforming in Volatile Times",
    "Fast decisions and a long-term vision give founder-CEOs an edge, according to a new multi-year study.",
    "office-glass",
  ],
  [
    "Politics",
    "Voters Turn to Local Issues as Election Season Intensifies",
    "Housing, transport and healthcare dominate campaign conversations in communities nationwide.",
    "town-hall",
  ],
  [
    "Entertainment",
    "Film Festival Spotlights a New Wave of Independent Directors",
    "Bold, personal storytelling takes center stage in a lineup praised by critics and audiences alike.",
    "film-reel",
  ],
  [
    "Lifestyle",
    "Minimalist Kitchens: Design Trends Defining Modern Homes",
    "Warm woods, hidden storage and sustainable materials are changing the heart of the home.",
    "modern-kitchen",
  ],
  [
    "Sports",
    "How Data Science Is Rewriting Training in Elite Athletics",
    "Wearable sensors and predictive models help coaches prevent injuries and fine-tune performance.",
    "runner-track",
  ],
  [
    "Technology",
    "Quantum Startups Move From Lab Demos to Real Contracts",
    "Early pilots in logistics and materials science signal a turning point for the emerging industry.",
    "quantum-lab",
  ],
  [
    "Business",
    "Supply Chains Get Smarter: The Rise of Regional Manufacturing Hubs",
    "Companies shorten delivery routes and build resilience by producing closer to their customers.",
    "warehouse-port",
  ],
  [
    "Politics",
    "New Digital Privacy Rules Take Effect Across Major Economies",
    "Tougher data-protection standards give consumers more control and businesses new compliance duties.",
    "law-books",
  ],
  [
    "Entertainment",
    "Live Music Rebounds With Record-Breaking Touring Season",
    "Festival grounds and arenas are packed as fans return in numbers not seen in a decade.",
    "concert-crowd",
  ],
  [
    "Lifestyle",
    "Sleep, Stress and Strength: A Practical Guide to Daily Wellness",
    "Simple, evidence-based habits that experts say can transform energy and focus within weeks.",
    "yoga-morning",
  ],
  [
    "Sports",
    "Young Talents Lead a Golden Generation Into the New Season",
    "A crop of teenage stars is expected to redefine the sport over the next ten years.",
    "soccer-ball",
  ],
];
const ARTICLES = RAW.map(([cat, title, desc, seed], id) => ({
  id,
  cat,
  title,
  desc,
  date: new Date(Date.now() - id * 1.5 * 864e5),
  img: `https://picsum.photos/seed/${seed}/800/520`,
}));
const TRENDING = [0, 5, 7, 3, 9]; // article ids shown as "trending"
const EXTRA =
  "Analysts say the coming weeks will be decisive, with industry leaders, policymakers and audiences watching closely. The Meridian Times will keep following developments and bring you verified updates as they happen.";
const state = { cat: "All", q: "" };

/* ---------- Helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const fmt = (d) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
// Image with graceful fallback (gradient background shows if the image fails)
const img = (a) =>
  `<img src="${a.img}" alt="${a.title}" loading="lazy" onerror="this.remove()">`;

// Scroll-reveal animation
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.1 },
);
const reveal = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

/* ---------- Templates ---------- */
const card = (a) => `
  <article class="card reveal" data-id="${a.id}" tabindex="0">
    <div class="im">${img(a)}<span class="badge">${a.cat}</span></div>
    <div class="cb"><time>${fmt(a.date)}</time><h3>${a.title}</h3><p>${a.desc}</p><a href="#" class="more">Read More →</a></div>
  </article>`;

/* ---------- Renderers ---------- */
function renderHero() {
  const h = ARTICLES[0];
  $("#home").innerHTML =
    `${img(h)}<div class="tx"><span class="badge">${h.cat}</span><h1>${h.title}</h1><p>${h.desc}</p><a href="#" class="btn" data-id="${h.id}">Read More</a></div>`;
}

function renderTrending() {
  $("#trend").innerHTML = TRENDING.map((id, i) => {
    const a = ARTICLES[id];
    return `<li class="reveal" data-id="${id}"><b>${i + 1}</b><span class="cat">${a.cat}</span><h3>${a.title}</h3></li>`;
  }).join("");
}

function renderSidebar() {
  $("#sTrend").innerHTML = TRENDING.slice(0, 4)
    .map(
      (id) =>
        `<li data-id="${id}"><div><h4>${ARTICLES[id].title}</h4><time>${fmt(ARTICLES[id].date)}</time></div></li>`,
    )
    .join("");
  $("#recent").innerHTML = ARTICLES.slice(1, 5)
    .map(
      (a) =>
        `<li data-id="${a.id}"><div class="th">${img(a)}</div><div><h4>${a.title}</h4><time>${fmt(a.date)}</time></div></li>`,
    )
    .join("");
}

function renderCategories() {
  $("#cats").innerHTML = CATS.map(
    (c) => `
    <section id="${c.toLowerCase()}">
      <div class="sh"><h2>${c}</h2><button class="va" data-cat="${c}">View all →</button></div>
      <div class="grid">${ARTICLES.filter((a) => a.cat === c)
        .map(card)
        .join("")}</div>
    </section>`,
  ).join("");
}

// Latest news grid — respects the active category filter and search query
function renderLatest() {
  const q = state.q.toLowerCase();
  const matches = ARTICLES.filter(
    (a) =>
      (state.cat === "All" || a.cat === state.cat) &&
      (!q || `${a.title} ${a.desc} ${a.cat}`.toLowerCase().includes(q)),
  );
  const list = state.cat === "All" && !q ? matches.slice(1, 7) : matches; // skip hero story by default
  $("#latest-title").textContent = q
    ? `Results for “${state.q}”`
    : state.cat === "All"
      ? "Latest News"
      : state.cat;
  $("#grid").innerHTML =
    list.map(card).join("") ||
    '<p class="empty">No stories match your search. Try another keyword or category.</p>';
  $$("#chips button").forEach((b) =>
    b.classList.toggle("on", b.dataset.cat === state.cat),
  );
  reveal();
}

/* ---------- Modal ---------- */
function openModal(id) {
  const a = ARTICLES[id];
  $("#mbody").innerHTML =
    `<div class="im">${img(a)}</div><div class="mt"><span class="badge">${a.cat}</span><h2>${a.title}</h2><time>${fmt(a.date)} · 4 min read</time><p>${a.desc}</p><p>${EXTRA}</p><button class="btn" data-close>Close</button></div>`;
  $("#modal").showModal();
}

/* ---------- Navigation & interactions ---------- */
const closeMenu = () => {
  $("#nav").classList.remove("open");
  $("#burger").setAttribute("aria-expanded", "false");
};

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  const c = e.target.closest("[data-cat]");
  const r = e.target.closest("[data-id]");
  if (e.target.closest("nav a")) closeMenu();
  if (e.target.closest("[data-close]") || e.target === $("#modal"))
    $("#modal").close();
  if (c) {
    state.cat = c.dataset.cat;
    state.q = "";
    $("#q").value = "";
    renderLatest();
    if (c.closest("nav"))
      $$("nav a").forEach((x) => x.classList.toggle("on", x === c));
    if (c.classList.contains("va"))
      $("#news").scrollIntoView({ behavior: "smooth" });
  } else if (e.target.closest("nav a")) {
    $$("nav a").forEach((x) =>
      x.classList.toggle("on", x === e.target.closest("nav a")),
    );
  }
  if (r) {
    e.preventDefault();
    openModal(+r.dataset.id);
  } else if (link && link.getAttribute("href") === "#") e.preventDefault();
});

// Keyboard access for cards
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.matches(".card"))
    openModal(+e.target.dataset.id);
});

// Mobile menu
$("#burger").addEventListener("click", () => {
  const open = $("#nav").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", open);
});

// Search
const sb = $("#sb");
$("#sbtn").addEventListener("click", () => {
  sb.classList.toggle("open");
  if (sb.classList.contains("open")) $("#q").focus();
});
$("#q").addEventListener("input", (e) => {
  state.q = e.target.value.trim();
  renderLatest();
});
$("#sform").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#news").scrollIntoView({ behavior: "smooth" });
});
$("#q").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
    state.q = "";
    renderLatest();
    sb.classList.remove("open");
  }
});

/* ---------- Newsletter validation ---------- */
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
$$("form.nf").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("input", f),
      msg = $(".msg", f),
      v = input.value.trim(),
      ok = isEmail(v);
    msg.className = "msg " + (ok ? "ok" : "err");
    msg.textContent = ok
      ? `Thank you! A confirmation has been sent to ${v}.`
      : v
        ? "Please enter a valid email address."
        : "Email address is required.";
    input.setAttribute("aria-invalid", !ok);
    if (ok) f.reset();
  }),
);

/* ---------- Init ---------- */
$("#today").textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
$("#yr").textContent = new Date().getFullYear();
$("#chips").innerHTML = ["All", ...CATS]
  .map((c) => `<button data-cat="${c}">${c}</button>`)
  .join("");
renderHero();
renderTrending();
renderSidebar();
renderCategories();
renderLatest();
reveal();
