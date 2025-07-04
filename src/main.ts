import './style.css';
import { Slider } from './components/Slider';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('App element (#app) not found');
}

app.innerHTML = `
  <h1>Canvas Image Slider</h1>
  <canvas id="image-slider" width="640" height="400"></canvas>
  <small class="slider-instruction">Drag to change image</small>
`;

const canvas = document.querySelector<HTMLCanvasElement>('#image-slider');
if (!canvas) {
  throw new Error('Canvas element (#image-slider) not found');
}

const imagePaths = ['/0.jpg', '/1.jpg', '/2.jpg', '/3.jpg'];

const slider = new Slider(canvas, imagePaths);

// Clean up the slider when the page is unloaded
window.addEventListener('beforeunload', () => {
  slider.destroy();
});