"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const segments = [
  { label: "Fragmento 1", start: 5, end: 10 },
  { label: "Fragmento 5", start: 12, end: 14 },
  { label: "Fragmento 25", start: 10, end: 17 },
];

const PLAYBACK_ID = "PLLJ4CuL9LMofLBm5MZZ2Mp02NDr3y7faGatChWrqPb4";
const HLS_URL = `https://stream.mux.com/${PLAYBACK_ID}.m3u8`;

export default function SegmentedPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const currentSegment = segments[currentSegmentIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
    }

    const onTimeUpdate = () => {
      if (video.currentTime >= currentSegment.end) {
        const next = currentSegmentIndex + 1;
        if (next < segments.length) {
          setCurrentSegmentIndex(next);
        } else {
          video.pause();
        }
      }
    };

    const onLoadedMetadata = () => {
      video.currentTime = currentSegment.start;
      video.play();
    };

    const onSeeked = () => {
      video.play();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [currentSegmentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = currentSegment.start;
    }
  }, [currentSegmentIndex]);

  return (
    <div style={{ background: "#000", padding: "2rem", textAlign: "center" }}>
      <h2 style={{ color: "#fff" }}>{currentSegment.label}</h2>
      <video
        ref={videoRef}
        controls={false}
        muted
        autoPlay
        playsInline
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: "12px",
        }}
      />
    </div>
  );
}
