import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { ImageLoader } from './ImageLoader';

describe('ImageLoader', () => {
  let imageLoader: ImageLoader;
  let mockImages: HTMLImageElement[];

  beforeEach(() => {
    mockImages = [
      {
        src: '',
        onload: vi.fn(),
        onerror: vi.fn(),
      } as unknown as HTMLImageElement,
      {
        src: '',
        onload: vi.fn(),
        onerror: vi.fn(),
      } as unknown as HTMLImageElement,
    ];

    let imageIndex = 0;

    vi.spyOn(global, 'Image').mockImplementation(() => {
      const img = mockImages[imageIndex];
      imageIndex++;
      // Ensure onload and onerror are properly triggered
      setTimeout(() => {
        if (img.onload) img.onload(new Event('load'));
      }, 0);
      return img;
    });

    imageLoader = new ImageLoader(['/0.jpg', '/1.jpg']);
  });

  it('should initialize with the provided image paths', () => {
    expect((imageLoader as any).imagePaths).toEqual(['/0.jpg', '/1.jpg']);
  });

  it('should load images successfully', async () => {
    const loadImagesPromise = imageLoader.loadImages();

    // Simulate successful image loading
    (mockImages[0].onload as Mock)();
    (mockImages[1].onload as Mock)();

    const loadedImages = await loadImagesPromise;

    expect(loadedImages).toHaveLength(2);
    expect(loadedImages[0].src).toContain('/0.jpg');
    expect(loadedImages[1].src).toContain('/1.jpg');
  });

  it('should handle image loading errors gracefully', async () => {
    const loadImagesPromise = imageLoader.loadImages();

    // Simulate one image failing to load
    setTimeout(() => {
      (mockImages[0].onload as Mock)();
      (mockImages[1].onerror as Mock)(new Event('error'));
    }, 0);

    const loadedImages = await loadImagesPromise;

    expect(loadedImages).toHaveLength(1);
    expect(loadedImages[0].src).toContain('/0.jpg');
  });

  it('should log an error when an image fails to load', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    const loadImagesPromise = imageLoader.loadImages();

    // Simulate one image failing to load
    setTimeout(() => {
      (mockImages[0].onload as Mock)();
      (mockImages[1].onerror as Mock)(new Event('error'));
    }, 0);

    await loadImagesPromise;

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load image: /1.jpg');
    consoleErrorSpy.mockRestore();
  });
});