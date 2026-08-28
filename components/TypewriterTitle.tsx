'use client';
import { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  text: string;
  speed?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export default function TypewriterTitle({
  text,
  delay = 80,
  as = 'h1',
  className = '',
  style = {}
}: TypewriterTitleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const Tag = as;
  const words = text.split(' ');

  return (
    <Tag
      className={className}
      style={{
        ...style,
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '0.28em',
        alignItems: 'baseline'
      }}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.96)',
            filter: isVisible ? 'blur(0px)' : 'blur(6px)',
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.07}s`,
            willChange: 'transform, opacity, filter'
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
