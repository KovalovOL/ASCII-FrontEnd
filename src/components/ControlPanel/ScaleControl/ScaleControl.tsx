import React from 'react';
import { useAsciiStore } from '../../../store/useAsciiStore';
import './ScaleControl.css';

export const ScaleControl: React.FC = () => {
  const { scale, setScale } = useAsciiStore();

  return (
    <div className="control-group">
      <div className="control-label">
        Scale <span className="slider-value">{scale.toFixed(2)}x</span>
      </div>
      <div className="slider-container">
        <input 
          type="range" 
          min="0.001" 
          max="3" 
          step="0.0002" 
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))} 
        />
      </div>
    </div>
  );
};
