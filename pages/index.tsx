import VSLPlayer from "../components/VSLPlayer";

export default function Home() {
  const playbackIds = [
    "PLLJ4CuL9LMofLBm5MZZ2Mp02NDr3y7faGatChWrqPb4",
    "dJncnhnalgoS7khYQIHhPfzqQz9igzYHuGzUjwTBPXA",
    "402x2M6c00d01pLzE23fvD3RMbSjxufw00RMoylhdCXF023k"
  ];

  return (
    <main>
      <h1 style={{ padding: "2rem", textAlign: "center" }}>🎥 Codex VSL Dinámico</h1>
      <VSLPlayer playbackIds={playbackIds} />
    </main>
  );
}
