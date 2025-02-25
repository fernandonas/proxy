export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder requisições OPTIONS para evitar bloqueios do navegador
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "A URL da API é obrigatória" });
  }

  try {
    const response = await fetch(decodeURIComponent(url));
    const data = await response.text();

    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os dados", details: error.message });
  }
}
