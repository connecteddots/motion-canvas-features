import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      // Motion Canvas specific configuration
      output: './output', // Output directory      fps: 60, // Frames per second
    }),
    ffmpeg(),
  ],
});
