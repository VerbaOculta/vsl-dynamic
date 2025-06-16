export default function Home() {
  const ids = [
    "SE00mWxTnQbS02VbN4O4eC00DU002GVrUql9I01uo4IL53QM",
    "lMaFThdXKcHKMp8hwTXJjyBz2VdP602ChEhOquHgXvqs",
    "SE00mWxTnQbS02VbN4O4eC00DU002GVrUql9I01uo4IL53QM",
  ].join(",");

  return (
    <main style={{ padding: 40 }}>
      <h1>🎥 VSL dinámico con Mux</h1>
      <video
        controls
        autoPlay
        style={{ width: "100%", maxWidth: 800 }}
        src={`/api/vsl-playlist?ids=${ids}`}
      />
    </main>
  );
}
