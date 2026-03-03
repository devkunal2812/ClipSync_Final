// api/signal.js  — Vercel Edge Function
// Holds sessions in memory for 60s max, then auto-deletes
const sessions = new Map()

export default function handler(req, res) {
  const { code, type, data } = JSON.parse(req.body)

  if (type === 'offer') {
    sessions.set(code, { data, ts: Date.now() })
    // Auto-clean after 60 seconds
    setTimeout(() => sessions.delete(code), 60000)
    res.json({ ok: true })
  }

  if (type === 'poll') {
    const s = sessions.get(code)
    if (s) { sessions.delete(code); res.json({ data: s.data }) }
    else res.json({ waiting: true })
  }
}
