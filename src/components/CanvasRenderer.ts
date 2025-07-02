export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }
  /**
   * Draws the images on the canvas, centered within rectangles that match the canvas size.
   * @param images - Array of HTMLImageElement objects to draw.
   * @param offsetX - Horizontal offset for the images.
   */
  drawImages(images: HTMLImageElement[], offsetX: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let x = offsetX;

    images.forEach((img) => {
      // Draw a rectangle that matches the canvas size
      this.ctx.fillStyle = '#f2f2f2'; // Set the rectangle color
      this.ctx.fillRect(x, 0, this.canvas.width, this.canvas.height);

      // Calculate the aspect ratio to maintain the image's proportions
      const aspectRatio = img.width / img.height;
      let drawWidth = this.canvas.width;
      let drawHeight = this.canvas.width / aspectRatio;

      // If the calculated height exceeds the canvas height, adjust the width accordingly
      if (drawHeight > this.canvas.height) {
        drawHeight = this.canvas.height;
        drawWidth = this.canvas.height * aspectRatio;
      }

      // Center the image within the rectangle
      const y = (this.canvas.height - drawHeight) / 2;
      const centeredX = x + (this.canvas.width - drawWidth) / 2;

      // Draw the image centered within the rectangle
      this.ctx.drawImage(img, centeredX, y, drawWidth, drawHeight);

      // Move x to the next rectangle position
      x += this.canvas.width;
    });
  }
}