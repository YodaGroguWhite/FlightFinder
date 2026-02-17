export default async function handler(req, res) {
  const { origin, destination, departure_at, days = 7 } = req.query;

  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departure_at}&limit=${days}&sorting=price`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Access-Token": process.env.TP_TOKEN
      }
    });

    const data = await response.json();

    // 🔥 KLJUČNO: normalizacija podatkov
    data.data = data.data.map(t => ({
      ...t,
      price: t.price || t.value || 0,
      currency: t.currency || "RUB",
      airline: t.airline || "Unknown",
      flight_number: t.flight_number || "—",
      transfers: t.transfers ?? 0,
      duration: t.duration || "?"
    }));

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
