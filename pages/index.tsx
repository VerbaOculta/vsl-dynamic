// pages/index.tsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const playbackIds = [
  "SE00mWxTnQbS02VbN4O4eC00DU002GVrUql9I01uo4IL53QM",
  "lMaFThdXKcHKMp8hwTXJjyBz2VdP602ChEhOquHgXvqs",
  "SE00mWxTnQbS02VbN4O4eC00DU002GVrUql9I01uo4IL53QM",
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const playlistUrl = `/api/vsl-playlist?ids=${playbackIds.join(",")}`;

    if (video) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = playlistUrl;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(playlistUrl);
        hls.attachMedia(video);
      } else {
        console.error("HLS is not supported in this browser");
      }
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        🎥 VSL Dinámico con Mux + HLS.js
      </h1>
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "100%", maxWidth: "800px", borderRadius: "12px" }}
      />
    </main>
  );
}
