// pages/api/vsl-playlist.ts
export default function handler(req, res) {
  const { ids } = req.query;

  if (!ids || typeof ids !== "string") {
    return res.status(400).send("Missing or invalid 'ids' query param");
  }

  const playbackIds = ids.split(",");

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.write("#EXTM3U\n");
  res.write("#EXT-X-VERSION:3\n");

  playbackIds.forEach((id, idx) => {
    if (idx > 0) res.write("#EXT-X-DISCONTINUITY\n");
    res.write(`#EXTINF:0,\n`);
    res.write(`https://stream.mux.com/${id}.m3u8\n`);
  });

  res.end();
}
