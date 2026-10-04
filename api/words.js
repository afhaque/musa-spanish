// /api/words — server-side proxy for the "Add more words" LLM chat.
// The Kimi (Moonshot) API key lives ONLY in Vercel env vars; the browser
// never sees it. Every request must carry the site password, which is
// checked here (not in client JS), so the gate is real.
//
// POST { password, message }        -> { content }   (chat turn)
// POST { password, check: true }    -> { ok: true }  (unlock validation, no upstream call)

const KIMI_BASE = "https://api.kimi.com/coding/v1";
const MODEL = "kimi-for-coding"; // temperature is fixed at 1 on this model — do not send one

const SYSTEM_PROMPT = `You expand the word lists of a toddler's flashcard app. The app has two games: "spanish" (Spanish vocabulary) and "sight" (English sight words for early readers).

Reply with ONLY a JSON object, no markdown fences, no explanation:
{"spanish":{"Category Name":[{"word":"el tiburón","sub":"the shark","emoji":"🦈"}]},"sight":{"Category Name":[{"word":"shark","emoji":"🦈"}]}}

Rules:
- Include only the games/categories the user asked for; omit the rest.
- Spanish words: singular noun with correct article (el/la) and proper accents; "sub" is the English translation ("the shark"). Colors/shapes keep their usual form.
- Sight words: simple English words a 3-5 year old can read; NO "sub" field.
- One clear, common emoji per word.
- 3 to 12 words per category per request.
- Kid-appropriate vocabulary only.`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const body = req.body || {};
  if (body.password !== process.env.WORDS_PASSWORD) {
    return res.status(401).json({ error: "wrong password" });
  }
  if (body.check === true) return res.status(200).json({ ok: true });

  const message = typeof body.message === "string" ? body.message.trim().slice(0, 500) : "";
  if (!message) return res.status(400).json({ error: "empty message" });
  if (!process.env.KIMI_API_KEY) return res.status(500).json({ error: "server not configured" });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60000);
  try {
    const upstream = await fetch(`${KIMI_BASE}/chat/completions`, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.KIMI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });
    clearTimeout(timer);
    if (!upstream.ok) return res.status(502).json({ error: `Kimi API error ${upstream.status}` });
    const data = await upstream.json();
    const content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
    if (!content) return res.status(502).json({ error: "empty reply from model" });
    return res.status(200).json({ content });
  } catch (err) {
    clearTimeout(timer);
    const msg = err.name === "AbortError" ? "model timed out" : "upstream error";
    return res.status(502).json({ error: msg });
  }
};
