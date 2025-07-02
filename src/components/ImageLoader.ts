/**
 * ImageLoader class to load images from given paths.
 */
export class ImageLoader {
  private imagePaths: string[];
  private images: HTMLImageElement[] = [];

  constructor(imagePaths: string[]) {
    this.imagePaths = imagePaths;
  }
  /**
   * Loads images from the specified paths and returns them in order.
   * @returns Promise that resolves to an array of HTMLImageElement objects.
   */
  async loadImages(): Promise<HTMLImageElement[]> {
    for (const path of this.imagePaths) {
      const img = new Image();
      img.src = path;

      try {
        // Wait for the image to load from the path so they're stored in order
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        this.images.push(img);
      } catch {
        console.error(`Failed to load image: ${path}`);
      }
    }
    return this.images;
  }
}