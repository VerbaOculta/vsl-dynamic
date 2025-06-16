import SegmentedPlayer from "../components/SegmentedPlayer";

export default function Home() {
  return (
    <main>
      <h1 style={{ padding: "2rem", textAlign: "center" }}>
        🎥 VSL desde un solo video (por tramos)
      </h1>
      <SegmentedPlayer />
    </main>
  );
}
