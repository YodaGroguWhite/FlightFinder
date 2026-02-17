export default async function handler(req, res) {
  const { origin, destination, departure_at } = req.query;

  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departure_at}`;

  const response = await fetch(url, {
    headers: {
      "X-Access-Token": process.env.TP_TOKEN
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
