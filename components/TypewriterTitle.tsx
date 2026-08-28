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
  delay = 50,
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

  return (
    <Tag
      className={className}
      style={{
        width: '100%',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
        ...style
      }}
    >
      {text}
    </Tag>
  );
}
