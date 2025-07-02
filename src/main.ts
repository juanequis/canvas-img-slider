import './style.css';
import { Slider } from './components/Slider';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Canvas Image Slider</h1>
  <h2>Drag to slide through images</h2>
  <canvas id="image-slider" width="640" height="400"></canvas>
`

const canvas = document.querySelector<HTMLCanvasElement>('#image-slider')!;

// Image paths relative to the HTML file
const imagePaths = ['/0.jpg', '/1.jpg', '/2.jpg', '/3.jpg'];

// Initialize the slider with the canvas element and image paths
new Slider(canvas, imagePaths);