import React, { useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { MiniZoom } from './components/MiniZoom/MiniZoom';
import { ViewerArea } from './components/ViewerArea/ViewerArea';
import { useAsciiStore } from './store/useAsciiStore';
import './App.css';

const App: React.FC = () => {
  const { setScale, scale } = useAsciiStore();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        setScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setScale]);

  return (
    <div className="app-container">
      <ControlPanel />
      <MiniZoom />
      <ViewerArea />
    </div>
  );
};

export default App;
