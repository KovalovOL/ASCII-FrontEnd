import React from 'react';
import { useAsciiStore } from '../../../store/useAsciiStore';
import './SpacingControl.css';

export const SpacingControl: React.FC = () => {
  const { charSpace, lineSpace, setCharSpace, setLineSpace } = useAsciiStore();

  return (
    <div className="control-group">
      <div className="spacing-label">
        Char Space <span>{charSpace}px</span>
      </div>
      <input 
        type="range" 
        min="-5.5" 
        max="5" 
        step="0.2" 
        value={charSpace}
        onChange={(e) => setCharSpace(parseFloat(e.target.value))} 
      />
      
      <div className="spacing-label mt-8">
        Line Space <span>{lineSpace}</span>
      </div>
      <input 
        type="range" 
        min="0.3" 
        max="2" 
        step="0.01" 
        value={lineSpace}
        onChange={(e) => setLineSpace(parseFloat(e.target.value))} 
      />
    </div>
  );
};
