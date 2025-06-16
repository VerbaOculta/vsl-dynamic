import VSLPlayer from "../components/VSLPlayer";

export default function Home() {
  const playbackIds = [
    "PLLJ4CuL9LMofLBm5MZZ2Mp02NDr3y7faGatChWrqPb4",
    "402x2M6c00d01pLzE23fvD3RMBsSjxufw00RMoy1hdCXF023k",
    "dJncnhnalgoS7khYQIHhPfzqQz9igzYHuGzUjwTBPXA"
  ];

  return (
    <main>
      <h1 style={{ padding: "2rem", textAlign: "center" }}>🎥 Codex VSL Dinámico</h1>
      <VSLPlayer playbackIds={playbackIds} />
    </main>
  );
}
