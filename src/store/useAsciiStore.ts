import { create } from 'zustand';

interface AsciiState {
  // Config
  palette: string;
  charSpace: number;
  lineSpace: number;
  textColor: string;
  bgColor: string;
  font: string;
  fontWeight: string;
  fontStyle: string;

  // View state
  scale: number;
  imageScale: number;
  offsetX: number;
  offsetY: number;
  isPanelCollapsed: boolean;
  isInverted: boolean;

  // Data
  asciiText: string;
  fileInfo: string;
  imageFile: File | null;
  artInfo: { width: number; height: number } | null;

  // Actions
  setPalette: (palette: string) => void;
  setCharSpace: (space: number) => void;
  setLineSpace: (space: number) => void;
  setTextColor: (color: string) => void;
  setBgColor: (color: string) => void;
  setFont: (font: string) => void;
  setFontWeight: (weight: string) => void;
  setFontStyle: (style: string) => void;
  
  setScale: (scale: number) => void;
  setImageScale: (scale: number) => void;
  setOffset: (offsetX: number, offsetY: number) => void;
  setIsPanelCollapsed: (collapsed: boolean) => void;
  
  setImageFile: (file: File | null, fileInfo: string) => void;
  generateAscii: () => Promise<void>;
  
  // Helpers
  invertPalette: () => void;
}

export const useAsciiStore = create<AsciiState>((set, get) => ({
  // Config defaults
  palette: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. ",
  charSpace: 0,
  lineSpace: 1.0,
  textColor: '#000000',
  bgColor: '#ffffff',
  font: 'Consolas, monospace',
  fontWeight: 'normal',
  fontStyle: 'normal',

  // View defaults
  scale: 1,
  imageScale: 0.5,
  offsetX: 0,
  offsetY: 0,
  isPanelCollapsed: false,
  isInverted: false,

  // Data defaults
  asciiText: `Choose image to generate ASCII art
    
    Example:
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣄⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠋⠀⠘⣇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠇⠀⠀⠀⢸⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⢸⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠇⠀⠀⠀⠀⢸⠇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡎⠀⠀⠀⠀⠀⢸⠀⠀⠀
⠀⠀⢀⣀⣀⣀⠀⠀⠀⠀⠀⢀⣀⣤⡤⠤⠤⠤⠤⢤⣤⣀⡤⢖⡿⠛⠉⢳⠀⠀⠀⠀⠀⢸⠀⠀⠀
⠀⢼⠁⠉⠉⠛⠻⢭⡓⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⣏⠀⠀⠀⢸⠀⠀⠀⠀⠀⡤⠀⠀⠀
⠀⠸⡄⠀⠀⠀⠀⢸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠂⠀⠀⡜⠀⠀⠀⠀⢀⡇⠀⠀⠀
⠀⠀⢷⠀⠀⠀⠠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⢠⠏⠀⠀⠀⠀⢸⠃⠀⠀⠀
⠀⠀⠈⢧⠀⢀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀
⠀⠀⠀⠈⢳⡈⠁⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⣶⣶⣦⠀⠀⢹⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⢠⣾⣟⣹⡄⠀⠀⠀⠀⡀⠀⣿⣿⣿⡇⠀⢈⣧⠤⠤⠶⠶⢷⠒⠒⠂⠀
⠀⠀⢀⣀⣠⡧⠄⠀⠀⠀⣾⣿⣿⣿⠇⠀⠀⠀⠙⠁⠀⠙⠻⠿⠃⠀⠨⣼⣤⣀⡀⠀⠈⢧⠀⠀⠀
⠘⠉⠁⠀⢸⣤⡤⠀⠀⠀⠛⢿⡿⠋⠀⠀⠀⠀⠴⠦⠀⠀⠀⠀⠀⠐⣲⣯⡀⠀⠈⠙⠓⠺⣧⣄⡀
⠀⣀⡤⠚⠉⢳⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠃⠀⠈⠓⢦⡀⠀⠀⢸⠀⠈
⠀⠁⠀⢀⡔⠉⠙⡶⢄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⠚⠁⠀⠀⠀⠀⠀⠀⠈⠓⠆⠀⡇⠀
⠀⠀⠰⠋⠀⠀⢸⡇⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠀
⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡎⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⢆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠄⠀⢰⠇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠶⠺⣇⠀⣀⡜⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⡄⠀⠀⠀⠹⡟⠒⢢⡀⠀⠀⠀⠀⢀⡏⠀⠀⠀⠈⠉⠉⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⠀⠀⢀⡇⠀⠀⠻⣄⠀⠀⠀⡸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⠶⠋⠀⠀⠀⠀⠈⣣⠶⠖⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    
    Upload image and press Generate`,
  fileInfo: '',
  imageFile: null,
  artInfo: null,

  setPalette: (palette) => set({ palette }),
  setCharSpace: (charSpace) => set({ charSpace }),
  setLineSpace: (lineSpace) => set({ lineSpace }),
  setTextColor: (textColor) => set({ textColor }),
  setBgColor: (bgColor) => set({ bgColor }),
  setFont: (font) => set({ font }),
  setFontWeight: (fontWeight) => set({ fontWeight }),
  setFontStyle: (fontStyle) => set({ fontStyle }),
  
  setScale: (newScale) => set((state) => {
    const clampedScale = Math.min(Math.max(newScale, 0.03), 3);
    const scaleRatio = clampedScale / state.scale;
    return {
      scale: clampedScale,
      offsetX: state.offsetX * scaleRatio,
      offsetY: state.offsetY * scaleRatio
    };
  }),
  setImageScale: (imageScale) => set({ imageScale }),
  setOffset: (offsetX, offsetY) => set({ offsetX, offsetY }),
  setIsPanelCollapsed: (isPanelCollapsed) => set({ isPanelCollapsed }),
  
  setImageFile: (imageFile, fileInfo) => set({ imageFile, fileInfo, artInfo: null }),
  
  invertPalette: () => set((state) => ({ 
    isInverted: !state.isInverted,
    palette: state.palette.split('').reverse().join('') 
  })),

  generateAscii: async () => {
    const { imageFile, palette, imageScale } = get();
    if (!imageFile) {
      alert("Please select an image first");
      return;
    }

    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("palette", palette);
      form.append("scale", imageScale.toString());

      const res = await fetch(import.meta.env.ASCII_API_URL || "http://localhost:8080/pixelart", {
        method: "POST",
        body: form
      });

      if (!res.ok) {
        throw new Error("Server error: " + res.status);
      }

      const data = await res.json();
      set({ 
        asciiText: data.ascii,
        artInfo: { width: data.width, height: data.height }
        // Zoom adjustment will be handled by the component after render
      });
    } catch (err: any) {
      console.error(err);
      alert("Failed to generate ASCII: " + err.message);
    }
  }
}));
