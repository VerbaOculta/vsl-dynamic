import SegmentedMuxPlayer from "../components/SegmentedMuxPlayer";

export default function Home() {
  return (
    <main>
      <h1 style={{ textAlign: "center", padding: "2rem" }}>
        🎥 VSL Segmentado desde un solo asset
      </h1>
      <SegmentedMuxPlayer />
    </main>
  );
}
