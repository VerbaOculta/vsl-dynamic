"use client";

import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

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
        const nextIndex = currentSegmentIndex + 1;
        if (nextIndex < segments.length) {
          setIsSeeking(true);
          setCurrentSegmentIndex(nextIndex);
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
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#000",
        minHeight: "100vh",
        cursor: "none",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>{currentSegment.label}</h2>
      <MuxPlayer
        ref={playerRef}
        playbackId={PLAYBACK_ID}
        streamType="on-demand"
        autoPlay
        muted
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 12,
          outline: "none",
        }}
        nohotkeys
        noautoload
        defaultHiddenCaptions
      />
    </div>
  );
}
