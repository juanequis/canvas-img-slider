import { test, expect } from '@playwright/test';

test.describe('Canvas Image Slider', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app's URL (adjust the URL if necessary)
    await page.goto('http://localhost:5173'); // Replace with your dev server URL
  });

  test('should load the canvas and display images', async ({ page }) => {
    // Check if the canvas is visible
    const canvas = await page.locator('#image-slider');
    await expect(canvas).toBeVisible();

    // Verify that the canvas has been rendered with the correct dimensions
    const canvasWidth = await canvas.evaluate((el: HTMLCanvasElement) => el.width);
    const canvasHeight = await canvas.evaluate((el: HTMLCanvasElement) => el.height);
    expect(canvasWidth).toBe(640);
    expect(canvasHeight).toBe(400);
  });

  test('should allow dragging to slide images', async ({ page }) => {
    const canvas = await page.locator('#image-slider');

    // Take a screenshot of the canvas before dragging
    const beforeDrag = await canvas.screenshot();

    // Simulate a drag action on the canvas
    const boundingBox = await canvas.boundingBox();
    if (!boundingBox) throw new Error('Canvas bounding box not found');

    const startX = boundingBox.x + boundingBox.width / 2;
    const startY = boundingBox.y + boundingBox.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 200, startY, { steps: 10 });
    await page.mouse.up();

    // Take a screenshot of the canvas after dragging
    const afterDrag = await canvas.screenshot();

    // Compare the two screenshots
    expect(beforeDrag).not.toEqual(afterDrag); // Ensure the canvas content has changed
  });
});