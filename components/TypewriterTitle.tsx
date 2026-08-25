'use client';
import { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms delay before typing
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export default function TypewriterTitle({
  text,
  speed = 35,
  delay = 120,
  as = 'h1',
  className = '',
  style = {},
  cursorColor = 'var(--rey)'
}: TypewriterTitleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  const Tag = as;

  return (
    <Tag className={className} style={{ ...style, position: 'relative' }}>
      {displayedText}
      <span
        className="typewriter-cursor"
        style={{
          backgroundColor: cursorColor,
          opacity: isTyping ? 1 : undefined
        }}
      />
    </Tag>
  );
}
