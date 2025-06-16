"use client";

import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";


const segments = [
  { start: 0, end: 5 },
  { start: 8, end: 11 },
  { start: 12, end: 15 },
];

export default function SegmentedMuxPlayer() {
  const playerRef = useRef<HTMLMuxPlayerElement | null>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleTimeUpdate = () => {
      const currentTime = player.currentTime;
      const currentSegment = segments[currentSegmentIndex];

      if (!isSeeking && currentTime >= currentSegment.end) {
        player.pause();
        const nextIndex = currentSegmentIndex + 1;

        if (nextIndex < segments.length) {
          setIsSeeking(true);
          setCurrentSegmentIndex(nextIndex);
          player.currentTime = segments[nextIndex].start;
        }
      }
    };

    const handleSeeked = () => {
      if (isSeeking) {
        setIsSeeking(false);
        player.play();
      }
    };

    player.addEventListener("timeupdate", handleTimeUpdate);
    player.addEventListener("seeked", handleSeeked);

    // Iniciar reproducción en el primer segmento
    const startFirstSegment = () => {
      player.currentTime = segments[0].start;
      player.play();
    };

    player.addEventListener("loadedmetadata", startFirstSegment);

    return () => {
      player.removeEventListener("timeupdate", handleTimeUpdate);
      player.removeEventListener("seeked", handleSeeked);
      player.removeEventListener("loadedmetadata", startFirstSegment);
    };
  }, [currentSegmentIndex, isSeeking]);

  return (
    <MuxPlayer
      ref={playerRef}
      playbackId="PLLJ4CuL9LMofLBm5MZZ2Mp02NDr3y7faGatChWrqPb4"
      streamType="on-demand"
      autoPlay
      style={{ width: "100%", maxWidth: 800 }}
    />
  );
}
