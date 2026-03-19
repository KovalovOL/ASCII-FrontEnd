import React from 'react';
import { useAsciiStore } from '../../../store/useAsciiStore';
import './ImageUploader.css';

export const ImageUploader: React.FC = () => {
  const { fileInfo, setImageFile, generateAscii, imageScale, setImageScale, artInfo } = useAsciiStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const size = (file.size / 1024).toFixed(1);
      setImageFile(file, `${file.name} (${size} KB)`);
      
      // The original code called generateAscii automatically
      // Need a timeout or wait for state to update, but since we update state 
      // asynchronously, we might just call it here with the file directly 
      // or rely on a useEffect in App. Let's rely on the generate button or call store action shortly.
      // Wait, Zustand state update is immediate in next tick, but to be safe:
      setTimeout(() => generateAscii(), 0);
    } else {
      setImageFile(null, '');
    }
  };

  return (
    <div className="control-group">
      <div className="control-label">Image</div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div className="file-info">{fileInfo}</div>
      {artInfo && (
        <div className="file-info" style={{ marginTop: '2px', color: '#666' }}>
          Art size: {artInfo.width} &times; {artInfo.height}
        </div>
      )}
      
      <div className="control-label" style={{ marginTop: '12px' }}>
        Resampling Scale: <span>{imageScale.toFixed(2)}</span>
      </div>
      <input 
        type="range" 
        min="0.05" 
        max="1" 
        step="0.05" 
        value={imageScale}
        onChange={(e) => setImageScale(parseFloat(e.target.value))} 
        style={{ width: '100%' }}
      />
    </div>
  );
};
