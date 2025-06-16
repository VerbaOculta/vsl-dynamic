import { useEffect, useRef, useState } from "react";

interface Segment {
  label: string;
  start: number;
  end: number;
}

const segments: Segment[] = [
  { label: "Fragmento 1", start: 0, end: 5 },
  { label: "Fragmento 5", start: 6, end: 8 },
  { label: "Fragmento 25", start: 5, end: 9 }
];

const VIDEO_URL = "https://stream.mux.com/dJncnhnalgoS7khYQIHhPfzqQz9igzYHuGzUjwTBPXA.m3u8";

export default function SegmentedPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const segment = segments[currentSegmentIndex];

    const handleTimeUpdate = () => {
      if (video.currentTime >= segment.end) {
        if (currentSegmentIndex + 1 < segments.length) {
          setCurrentSegmentIndex(currentSegmentIndex + 1);
        } else {
          video.pause();
        }
      }
    };

    video.currentTime = segment.start;
    video.play();

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentSegmentIndex]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{segments[currentSegmentIndex]?.label}</h2>
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "100%", maxWidth: 800 }}
        src={VIDEO_URL}
      />
    </div>
  );
}
