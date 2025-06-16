"use client";

import { useEffect, useRef, useState } from "react";
import "@mux/mux-player"; // web component registration

useEffect(() => {
  const player = document.querySelector("mux-player");
  if (player) {
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
}, []);

const segments = [
  { label: "Fragmento 1", start: 5, end: 10 },
  { label: "Fragmento 5", start: 12, end: 14 },
  { label: "Fragmento 25", start: 10, end: 17 },
];

const PLAYBACK_ID = "PLLJ4CuL9LMofLBm5MZZ2Mp02NDr3y7faGatChWrqPb4";

export default function SegmentedMuxPlayer() {
  const playerRef = useRef<any>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const currentSegment = segments[currentSegmentIndex];

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleTimeUpdate = () => {
      if (!isSeeking && player.currentTime >= currentSegment.end) {
        const next = currentSegmentIndex + 1;
        if (next < segments.length) {
          setIsSeeking(true);
          setCurrentSegmentIndex(next);
        } else {
          player.pause();
        }
      }
    };

    const handleSeeked = () => {
      if (isSeeking) {
        setIsSeeking(false);
        player.play();
      }
    };

    const handleLoadedMetadata = () => {
      player.currentTime = currentSegment.start;
      player.play();
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("seeked", handleSeeked);
    player.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (player.readyState >= 1) {
      player.currentTime = currentSegment.start;
      player.play();
    }

    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("seeked", handleSeeked);
      player.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSegmentIndex]);

  return (
    <div style={{ background: "#000", padding: "2rem", textAlign: "center" }}>
      <h2 style={{ color: "#fff" }}>{currentSegment.label}</h2>
      <mux-player
        ref={playerRef}
        playback-id={PLAYBACK_ID}
        stream-type="on-demand"
        auto-play
        muted
        default-hidden-controls="all"
        nohotkeys
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: "12px",
        }}
      />
    </div>
  );
}
