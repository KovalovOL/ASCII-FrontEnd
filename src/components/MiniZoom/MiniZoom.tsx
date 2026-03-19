import React from 'react';
import { useAsciiStore } from '../../store/useAsciiStore';
import './MiniZoom.css';

export const MiniZoom: React.FC = () => {
  const { scale, setScale, isPanelCollapsed } = useAsciiStore();

  if (!isPanelCollapsed) {
    return null;
  }

  return (
    <div className="mini-zoom">
      <span></span>
      <input 
        type="range" 
        min="0.03" 
        max="3" 
        step="0.01" 
        value={scale}
        onChange={(e) => setScale(parseFloat(e.target.value))} 
      />
      <span className="mini-zoom-value">{scale.toFixed(2)}x</span>
    </div>
  );
};
