import React from 'react';
import { useAsciiStore } from '../../../store/useAsciiStore';
import './ColorControl.css';

export const ColorControl: React.FC = () => {
  const { textColor, bgColor, setTextColor, setBgColor } = useAsciiStore();

  return (
    <div className="control-group">
      <div className="control-label">Colors</div>
      <div className="color-grid">
        <div className="color-item">
          <span>Text</span>
          <input 
            type="color" 
            value={textColor} 
            onChange={(e) => setTextColor(e.target.value)} 
          />
        </div>
        <div className="color-item">
          <span>Background</span>
          <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => setBgColor(e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
};
