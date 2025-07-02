import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { Slider } from './Slider';
import { CanvasRenderer } from './CanvasRenderer';
import { ImageLoader } from './ImageLoader';

vi.mock('./CanvasRenderer');
vi.mock('./ImageLoader');

describe('Slider', () => {
  let canvas: HTMLCanvasElement;
  let slider: Slider;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 400;

    (ImageLoader as unknown as Mock).mockImplementation(() => ({
      loadImages: vi.fn().mockResolvedValue([
        { width: 100, height: 100 } as HTMLImageElement,
        { width: 200, height: 200 } as HTMLImageElement,
      ]),
    }));

    slider = new Slider(canvas, ['/0.jpg', '/1.jpg']);
  });

  afterEach(() => {
    slider.destroy();
  });

  it('should initialize and load images', async () => {
    const mockDrawImages = vi.fn();

    (CanvasRenderer as unknown as Mock).mockImplementation(() => ({
      drawImages: mockDrawImages,
    }));

    slider = new Slider(canvas, ['/0.jpg', '/1.jpg']);

    await slider['initialize']();
    expect(mockDrawImages).toHaveBeenCalled();
  });

  it('should handle mouse down and start dragging', () => {
    const event = new MouseEvent('mousedown', { clientX: 100 });
    canvas.dispatchEvent(event);

    expect(slider['isDragging']).toBe(true);
    expect(slider['startX']).toBe(100);
  });

  it('should handle mouse move and update offset', () => {
    slider['isDragging'] = true;
    slider['startX'] = 200;

    const event = new MouseEvent('mousemove', { clientX: 150 });
    window.dispatchEvent(event);

    expect(slider['offsetX']).toBeLessThan(0);
  });

  it('should handle mouse up and stop dragging', () => {
    slider['isDragging'] = true;

    const event = new MouseEvent('mouseup');
    window.dispatchEvent(event);

    expect(slider['isDragging']).toBe(false);
  });

  it('should clean up event listeners on destroy', () => {
    const removeEventListenerSpy = vi.spyOn(canvas, 'removeEventListener');
    slider.destroy();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});