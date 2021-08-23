# File Image Resizer

Convert File Input of image, and converts to base64 string with a reduced width / height. Only works in browser environment.

## Getting started

Module return a function, and you can set properties:

```javascript
import Resizer from "file-image-resizer";

// ...
// img is File Image element from HTML file input

const base64 = Resizer(img, {
  width: 1000, // Integer of maximus width of image, in pixels
  height: 1000, // Integer of maximus height of image, in pixels
  quality: 1, // Decimal, 0 to 1 values
})
// ...
```

This function returns an object with b64 and file properties.
