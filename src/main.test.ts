import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { Slider } from './components/Slider';

vi.mock('./components/Slider');
vi.mock('./style.css', () => ({}));

/**
 * @todo: Fix test
 * Keep getting "Unknown file extension ".css"" for all this test suite.
 * Tried different approaches to mock CSS imports, but none worked.
 */
describe.skip('main.ts', () => {
  let canvas: HTMLCanvasElement;
  let sliderMock: Slider;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app"></div>
    `;

    // Mock the Slider class
    sliderMock = {
      destroy: vi.fn(),
    } as unknown as Slider;

    (Slider as unknown as Mock).mockImplementation(() => sliderMock);

    // Re-import main.ts to execute its code
    vi.resetModules();
    require('./main.ts');

    const canvasElement = document.querySelector<HTMLCanvasElement>('#image-slider');
    if (!canvasElement) {
      throw new Error('Canvas element (#image-slider) not found during test setup');
    }
    canvas = canvasElement;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the app HTML structure', () => {
    const app = document.querySelector<HTMLDivElement>('#app');
    expect(app).not.toBeNull();
    expect(app?.innerHTML).toContain('<h1>Canvas Image Slider</h1>');
    expect(app?.innerHTML).toContain('<canvas id="image-slider" width="640" height="400"></canvas>');
  });

  it('should initialize the Slider with the correct canvas and image paths', () => {
    expect(Slider).toHaveBeenCalledWith(canvas, ['/0.jpg', '/1.jpg', '/2.jpg', '/3.jpg']);
  });

  it('should clean up the Slider instance on beforeunload', () => {
    const beforeUnloadEvent = new Event('beforeunload');
    window.dispatchEvent(beforeUnloadEvent);

    expect(sliderMock.destroy).toHaveBeenCalled();
  });
});