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