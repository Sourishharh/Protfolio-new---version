import { useState, useEffect, useRef } from "react";

interface TypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypewriter({
  texts,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseTime = 1800,
}: TypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const current = texts[textIndex];

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}
