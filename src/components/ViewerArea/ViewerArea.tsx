import React, { useRef, useEffect } from 'react';
import { useAsciiStore } from '../../store/useAsciiStore';
import './ViewerArea.css';

export const ViewerArea: React.FC = () => {
  const { 
    asciiText, 
    scale, 
    offsetX, 
    offsetY, 
    charSpace, 
    lineSpace, 
    textColor, 
    bgColor, 
    font,
    fontWeight,
    fontStyle,
    setScale,
    setOffset
  } = useAsciiStore();

  const viewerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  
  // Drag state
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale(scale + delta);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleDoubleClick = () => {
    setOffset(0, 0);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      draggingRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      
      setOffset(useAsciiStore.getState().offsetX + dx, useAsciiStore.getState().offsetY + dy);
      
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setOffset]);

  // Handle auto-zoom after ascii generation
  useEffect(() => {
    if (!asciiRef.current || !asciiText) return;

    // Use a small timeout to let the DOM paint the text before measuring
    const timeout = setTimeout(() => {
      const el = asciiRef.current;
      if (!el) return;

      const currentTransform = el.style.transform;
      el.style.transform = 'none';

      const rect = el.getBoundingClientRect();
      const windowWidth = window.innerWidth * 0.9;
      const windowHeight = window.innerHeight * 0.9;

      if (rect.width > 0 && rect.height > 0) {
        const scaleX = windowWidth / rect.width;
        const scaleY = windowHeight / rect.height;
        let newScale = Math.min(scaleX, scaleY, 2);
        if (newScale > 3) {
          newScale = 3.0;
        }
        setScale(newScale);
      }

      el.style.transform = currentTransform;
    }, 100);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asciiText]); // Only want to test fit when the text actually changes

  return (
    <div 
      className="viewer" 
      ref={viewerRef}
      onWheel={handleWheel}
      style={{ backgroundColor: bgColor }}
    >
      <pre 
        id="ascii"
        ref={asciiRef}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        style={{
          color: textColor,
          fontFamily: font,
          fontWeight: fontWeight,
          fontStyle: fontStyle,
          letterSpacing: `${charSpace}px`,
          lineHeight: lineSpace,
          transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`,
          cursor: draggingRef.current ? 'grabbing' : 'grab'
        }}
      >
        {asciiText}
      </pre>
    </div>
  );
};
