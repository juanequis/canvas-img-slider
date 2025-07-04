# canvas-img-slider
Image Slider made with canvas.

## Running in static server
- Static assets are in `/dist` folder.
- User your preferred static file server to run the compiled version.

## Architecture
- `CanvasRenderer`: Handles rendering images on the canvas.
- `ImageLoader`: Loads images asynchronously.
- `Slider`: Manages user interactions and image transitions.

## Running the Project Locally
```sh
npm install
npm run dev
```

## Running tests
```sh
npm run test
npm run test:coverage
```

## Running e2e tests
```sh
npm run e2e
npm run e2e:headed
npm run e2e:ui
```

# react-canvas-img-slider
React Image Slider with canvas

## Running in static server
- Static assets are in `/dist` folder.
- User your preferred static file server to run the compiled version.

## Architecture
- `CanvasSlider`: Compound component that renders the Images inside the canvas and handles Dragging.
    - `CanvasSlider.Image`: Children component that given an image renders inside the canvas with the correct dimensions and positioning.

## Running the Project Locally
```sh
npm install
npm run dev
```

## Running tests
```sh
npm run test
npm run test:coverage
```

## Project takeaways

### Tech Stack
- TypeScript
- Vite
- Native Canvas API

### Highlights:
- Pure canvas logic with class-based structure
- Precise control over rendering and performance
- Fully self-contained
- Lightweight build

### Pros:
- ✅ Fastest runtime and performance
- ✅ Small bundle size (20% Smaller build than [React + Konva solution](https://github.com/juanequis/react-canvas-img-slider))
- ✅ More control of canvas
- ✅ Simpler mental model for canvas logic

### Cons:
- ❌ No component structure
- ❌ More boilerplate for DOM events
- ❌ Less extensible if UI or state grows

