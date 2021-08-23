/*!
 * Canvas HTML Image Resizer
 * Copyright(c) 2021 Luis Andrés Fonseca
 * MIT Licensed
 */
module.exports = function resizeImageWithCanvas(img, params = {}) {
  if (params?.width && !typeof params?.width === "number" && params?.width <= 0 || params?.height && !typeof params?.height === "number" && params?.height <= 0 || params?.quality && !typeof params?.quality === "number" && (params?.quality < 0 || params?.quality > 1)) throw new Error("width and height must be positive integers, and quality must be a decimal with values into 0 and 1");
  let MAX_WIDTH = params?.width || 1200;
  let MAX_HEIGHT = params?.height || 1200;
  let OUTPUT_QUALITY = params?.quality || .7;
  let width = img.width;
  let height = img.height; // Don't resize if it's small enough

  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
  }

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    return canvas.toDataURL("image/jpeg", OUTPUT_QUALITY);
  } else {
    return canvas.toDataURL("image/jpeg");
  }
};