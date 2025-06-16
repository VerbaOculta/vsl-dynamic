import VSLPlayer from "@/components/VSLPlayer";

export default function Home() {
  const playbackIds = [
    "SE00mWxTnQbS02VbN4O4eC00DU002GVrUql9I01uo4IL53QM",
    "lMaFThdXKcHKMp8hwTXJjyBz2VdP602ChEhOquHgXvqs",
    "SE00mWxTnQbS02VbN4O4eC00DU002GVrUql9I01uo4IL53QM"
  ];

  return (
    <main>
      <h1 style={{ padding: "2rem", textAlign: "center" }}>🎥 Codex VSL Dinámico</h1>
      <VSLPlayer playbackIds={playbackIds} />
    </main>
  );
}
