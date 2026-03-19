import React, { useState } from 'react';
import { useAsciiStore } from '../../../store/useAsciiStore';
import './PaletteControl.css';

const PRESETS = [
  { label: 'Standard', value: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. " },
  { label: 'Minimal', value: "@%#*+=-:. " },
  { label: 'Very minimal', value: "@%*-:. " },
  { label: 'Binary', value: "01 " },
  { label: 'Letters', value: " WMNHQOUKXAVCJYLTFz7vli{}:\"., " }
];

export const PaletteControl: React.FC = () => {
  const { palette, setPalette, invertPalette, generateAscii, imageFile, isInverted } = useAsciiStore();
  
  const getPresetValue = (val: string) => isInverted ? val.split('').reverse().join('') : val;

  // Decide if current palette is a preset
  const isPreset = PRESETS.some(p => getPresetValue(p.value) === palette);
  const [mode, setMode] = useState<'preset' | 'custom'>(isPreset ? 'preset' : 'custom');

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'custom') {
      setMode('custom');
    } else {
      setMode('preset');
      setPalette(e.target.value);
      if (imageFile) setTimeout(generateAscii, 0);
    }
  };

  const handleCustomKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Generate ASCII immediately on pressing Enter
    if (e.key === 'Enter' && imageFile) {
      generateAscii();
    }
  };

  const handleInvert = () => {
    invertPalette();
    if (imageFile) setTimeout(generateAscii, 0);
  };

  return (
    <div className="control-group">
      <div className="control-label">Chars Pool</div>
      <select 
        value={mode === 'preset' ? palette : 'custom'} 
        onChange={handlePresetChange}
      >
        {PRESETS.map((p, i) => (
          <option key={i} value={getPresetValue(p.value)}>
            {p.label}{isInverted ? ' (Inverted)' : ''}
          </option>
        ))}
        <option value="custom">Custom...</option>
      </select>
      
      {mode === 'custom' && (
        <input 
          type="text" 
          value={palette} 
          onChange={(e) => setPalette(e.target.value)} 
          onKeyDown={handleCustomKeyDown}
          placeholder="Enter characters and press Enter"
          style={{ marginTop: '8px' }}
        />
      )}
      <button className="small-btn" onClick={handleInvert}>
        Invert chars
      </button>
    </div>
  );
};
