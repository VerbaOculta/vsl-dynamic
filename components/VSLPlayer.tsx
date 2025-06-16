import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VSLPlayerProps {
  playbackIds: string[];
}

export default function VSLPlayer({ playbackIds }: VSLPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPlaybackId = playbackIds[currentIndex];
  const currentSrc = `https://stream.mux.com/${currentPlaybackId}.m3u8`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = currentSrc;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentSrc);
      hls.attachMedia(video);
      return () => hls.destroy(); // limpiar al cambiar de video
    } else {
      console.error("HLS no es compatible en este navegador");
    }
  }, [currentPlaybackId]);

  const handleEnded = () => {
    if (currentIndex + 1 < playbackIds.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        onEnded={handleEnded}
        style={{ width: "100%", maxWidth: 800, borderRadius: 12 }}
      />
      <p style={{ marginTop: 10 }}>
        Reproduciendo fragmento {currentIndex + 1} de {playbackIds.length}
      </p>
    </div>
  );
}
