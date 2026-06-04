export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Parameter URL tidak ditemukan.' });
    }

    try {
        const response = await fetch(url, {
            headers: {
                // Memalsukan User-Agent agar tidak dicurigai sebagai bot oleh Cloudflare
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Server target menolak akses dengan status: ${response.status}` });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: `Gagal memuat dari target: ${error.message}` });
    }
}
