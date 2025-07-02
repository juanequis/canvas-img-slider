import './style.css'
import { setupSlider } from './slider.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="canvas" width="640" height="400"></canvas>
  </div>
`

setupSlider(document.querySelector<HTMLCanvasElement>('#canvas')!)
