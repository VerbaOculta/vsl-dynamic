"use client";

import { useEffect, useRef, useState } from "react";
import "@mux/mux-player";

const segments = [
  { label: "Fragmento 1", start: 5, end: 10 },
  { label: "Fragmento 5", start: 12, end: 14 },
  { label: "Fragmento 25", start: 10, end: 17 },
];

const PLAYBACK_ID = "PLLJ4CuL9LMofLBm5MZZ2Mp02NDr3y7faGatChWrqPb4";

export default function SegmentedMuxPlayer() {
  const playerRef = useRef<any>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const currentSegment = segments[currentSegmentIndex];

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleTimeUpdate = () => {
      if (player.currentTime >= currentSegment.end) {
        const next = currentSegmentIndex + 1;
        if (next < segments.length) {
          setCurrentSegmentIndex(next);
        } else {
          player.pause();
        }
      }
    };

    const handleLoadedMetadata = () => {
      player.currentTime = currentSegment.start;
      player.play();
    };

    const handleSeeked = () => {
      player.play();
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("loadedmetadata", handleLoadedMetadata);
    player.addEventListener("seeked", handleSeeked);

    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("loadedmetadata", handleLoadedMetadata);
      player.removeEventListener("seeked", handleSeeked);
    };
  }, [currentSegmentIndex]);

  // 🔒 Asegurar ocultar controles vía variables CSS después de montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const player = document.querySelector("mux-player");
      if (player instanceof HTMLElement) {
        player.style.setProperty("--controls", "none");
        player.style.setProperty("--dialog", "none");
        player.style.setProperty("--loading-indicator", "none");
        player.style.setProperty("--play-button", "none");
        player.style.setProperty("--center-controls", "none");
        player.style.setProperty("--bottom-play-button", "none");
        player.style.setProperty("--seek-backward-button", "none");
        player.style.setProperty("--seek-forward-button", "none");
        player.style.setProperty("--fullscreen-button", "none");
        player.style.setProperty("--volume-range", "none");
        player.style.setProperty("--time-range", "none");
        player.style.setProperty("--time-display", "none");
        player.style.setProperty("--duration-display", "none");
      }
    }
  }, []);

  return (
    <div style={{ background: "#000", padding: "2rem", textAlign: "center" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
        {currentSegment.label}
      </h2>

      <mux-player
        ref={playerRef}
        playback-id={PLAYBACK_ID}
        stream-type="on-demand"
        auto-play
        muted
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: "12px",
        }}
      />
    </div>
  );
}
