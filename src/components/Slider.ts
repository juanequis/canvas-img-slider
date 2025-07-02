import { ImageLoader } from './ImageLoader';
import { CanvasRenderer } from './CanvasRenderer';

/**
 * Slider class to create an image slider using a canvas element.
 * It allows dragging to view different images in a horizontal layout.
 */
export class Slider {
  private canvas: HTMLCanvasElement;
  private renderer: CanvasRenderer;
  private loader: ImageLoader;
  private images: HTMLImageElement[] = [];
  private offsetX = 0;
  private isDragging = false;
  private startX = 0;

  // Store bound event handlers for later removal
  private boundOnMouseDown: (e: MouseEvent) => void;
  private boundOnMouseMove: (e: MouseEvent) => void;
  private boundOnMouseUp: () => void;

  constructor(canvas: HTMLCanvasElement, imagePaths: string[]) {
    this.canvas = canvas;
    this.renderer = new CanvasRenderer(canvas);
    this.loader = new ImageLoader(imagePaths);

    // Bind event handlers
    this.boundOnMouseDown = this.onMouseDown.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);
    this.boundOnMouseUp = this.onMouseUp.bind(this);

    this.attachEventListeners();
    this.initialize();
  }

  /**
   * Initializes the slider by loading images and drawing them on the canvas.
   */
  private async initialize() {
    this.images = await this.loader.loadImages();
    this.renderer.drawImages(this.images, this.offsetX);
  }

  /**
   * Attaches event listeners for mouse events to enable dragging functionality.
   */
  private attachEventListeners() {
    this.canvas.addEventListener('mousedown', this.boundOnMouseDown);
    window.addEventListener('mousemove', this.boundOnMouseMove);
    window.addEventListener('mouseup', this.boundOnMouseUp);
  }

  /**
   * Removes event listeners to prevent memory leaks.
   */
  public destroy() {
    this.canvas.removeEventListener('mousedown', this.boundOnMouseDown);
    window.removeEventListener('mousemove', this.boundOnMouseMove);
    window.removeEventListener('mouseup', this.boundOnMouseUp);
  }

  /**
   * Handles mouse down event to start dragging.
   * @param e - MouseEvent
   */
  private onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.startX = e.clientX;
  }

  /**
   * Handles mouse move event to update the image offset while dragging.
   * @param e - MouseEvent
   */
  private onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;

    const currentX = e.clientX;
    const deltaX = currentX - this.startX;
    this.startX = currentX;

    // Total width of all images
    const totalWidth = this.canvas.width * this.images.length;

    // Restrict offsetX to prevent dragging beyond the bounds
    const maxOffsetX = 0; // Leftmost position
    const minOffsetX = this.canvas.width - totalWidth; // Rightmost position

    // Update offsetX to ensure it stays within bounds
    this.offsetX = Math.min(maxOffsetX, Math.max(minOffsetX, this.offsetX + deltaX));

    // Redraw images with the updated offset
    this.renderer.drawImages(this.images, this.offsetX);
  }

  private onMouseUp() {
    this.isDragging = false;
  }
}