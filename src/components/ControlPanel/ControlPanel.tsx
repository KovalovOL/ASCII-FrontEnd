import React, { useState } from 'react';
import { useAsciiStore } from '../../store/useAsciiStore';
import { ImageUploader } from './ImageUploader/ImageUploader';
import { PaletteControl } from './PaletteControl/PaletteControl';
import { ScaleControl } from './ScaleControl/ScaleControl';
import { SpacingControl } from './SpacingControl/SpacingControl';
import { ColorControl } from './ColorControl/ColorControl';
import { FontControl } from './FontControl/FontControl';
import './ControlPanel.css';

export const ControlPanel: React.FC = () => {
  const { isPanelCollapsed, setIsPanelCollapsed, generateAscii, asciiText } = useAsciiStore();
  const [copyText, setCopyText] = useState("Copy Art");

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiText);
    setCopyText("Copied!");
    setTimeout(() => setCopyText("Copy Art"), 2000);
  };

  return (
    <div className={`controls ${isPanelCollapsed ? 'collapsed' : ''}`}>
      <div className="controls-header">
        <button 
          className="toggle-btn" 
          onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
        >
          &#9776; Control panel
        </button>
        {isPanelCollapsed && (
          <button className="action-btn" style={{ width: 'auto' }} onClick={handleCopy} title="Copy ASCII">
            {copyText === "Copied!" ? "✓" : "Copy"}
          </button>
        )}
      </div>
      
      <div className="panel-wrapper">
        <div className="panel-inner">
          <div className="panel-content">
            <ImageUploader />
            <PaletteControl />
            <ScaleControl />
            <SpacingControl />
            <ColorControl />
            <FontControl />
            
            <div className="action-buttons">
              <button className="action-btn" onClick={handleCopy}>
                {copyText}
              </button>
              <button className="generate-btn" onClick={generateAscii}>
                Generate ASCII
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
