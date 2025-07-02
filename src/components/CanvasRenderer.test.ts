import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CanvasRenderer } from './CanvasRenderer';

describe('CanvasRenderer', () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let renderer: CanvasRenderer;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 400;

    // Mock the getContext method
    ctx = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    vi.spyOn(canvas, 'getContext').mockImplementation(() => ctx);

    renderer = new CanvasRenderer(canvas);
  });

  it('should initialize with the provided canvas and context', () => {
    expect(renderer).toBeInstanceOf(CanvasRenderer);
    expect((renderer as any).canvas).toBe(canvas);
    expect((renderer as any).ctx).toBe(ctx);
  });

  it('should clear the canvas when drawImages is called with no images', () => {
    renderer.drawImages([], 0);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
  });

  it('should draw a single image centered on the canvas', () => {
    const image = { width: 200, height: 100 } as HTMLImageElement;
    renderer.drawImages([image], 0);

    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);

    const aspectRatio = image.width / image.height;
    const expectedWidth = canvas.width;
    const expectedHeight = canvas.width / aspectRatio;
    const expectedX = (canvas.width - expectedWidth) / 2;
    const expectedY = (canvas.height - expectedHeight) / 2;

    expect(ctx.drawImage).toHaveBeenCalledWith(
      image,
      expectedX,
      expectedY,
      expectedWidth,
      expectedHeight
    );
  });

  it('should draw multiple images with correct offsets', () => {
    const images = [
      { width: 200, height: 100 } as HTMLImageElement,
      { width: 300, height: 150 } as HTMLImageElement,
    ];
    renderer.drawImages(images, -640);

    expect(ctx.fillRect).toHaveBeenCalledTimes(2);
    expect(ctx.drawImage).toHaveBeenCalledTimes(2);
  });

  it('should handle images with extreme aspect ratios', () => {
    const wideImage = { width: 1000, height: 100 } as HTMLImageElement;
    const tallImage = { width: 100, height: 1000 } as HTMLImageElement;

    renderer.drawImages([wideImage, tallImage], 0);

    expect(ctx.drawImage).toHaveBeenCalledTimes(2);
  });
});