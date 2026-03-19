import React from 'react';
import { useAsciiStore } from '../../../store/useAsciiStore';
import './FontControl.css';

export const FontControl: React.FC = () => {
  const { font, setFont, fontWeight, setFontWeight, fontStyle, setFontStyle } = useAsciiStore();

  return (
    <div className="control-group">
      <div className="control-label">Fonts</div>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        <option value="Courier New, Courier, monospace">Courier New</option>
        <option value="Consolas, monospace">Consolas</option>
        <option value="Monaco, monospace">Monaco</option>
        <option value="Menlo, monospace">Menlo</option>
        <option value="Ubuntu Mono, monospace">Ubuntu Mono</option>
      </select>
      
      <div className="control-label" style={{ marginTop: '12px' }}>Font Weight</div>
      <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="100">Thin</option>
        <option value="300">Light</option>
        <option value="500">Medium</option>
        <option value="700">Bold</option>
        <option value="900">Black</option>
      </select>

      <div className="control-label" style={{ marginTop: '12px' }}>Font Style</div>
      <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="italic">Italic</option>
        <option value="oblique">Oblique</option>
      </select>
    </div>
  );
};
