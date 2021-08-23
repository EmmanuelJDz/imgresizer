/*!
 * File Image Resizer
 * Copyright(c) 2021 Luis Andrés Fonseca
 * MIT Licensed
 */

const resizeImageWithCanvas = require("canvas-image-resizer");

function convertAsyncToURL(data) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.onabort = () => reject(new Error("Abort URL convertion"));
  });
}

function base64ToFile(dataURI, paramsFile = { name: "file" }) {
  var byteString, mimestring;

  if (dataURI.split(",")[0].indexOf("base64") !== -1) {
    byteString = atob(dataURI.split(",")[1]);
  } else {
    byteString = decodeURI(dataURI.split(",")[1]);
  }

  mimestring = dataURI.split(",")[0].split(":")[1].split(";")[0];

  var content = new Array();
  for (var i = 0; i < byteString.length; i++) {
    content[i] = byteString.charCodeAt(i);
  }

  var newFile = new File([new Uint8Array(content)], paramsFile.name, {
    type: mimestring,
  });

  return newFile;
}

function imageCreator(url) {
  return new Promise((resolve, reject) => {
    var origImg = new Image();
    origImg.src = url;
    origImg.addEventListener("load", () => resolve(origImg));
    origImg.onabort = () => reject("Abort Image");
    origImg.onerror = reject;
  });
}

module.exports = function resizeFileImageWithCanvas(file, params = {}) {
  if (
    (params?.width &&
      !typeof params?.width === "number" &&
      params?.width <= 0) ||
    (params?.height &&
      !typeof params?.height === "number" &&
      params?.height <= 0) ||
    (params?.quality &&
      !typeof params?.quality === "number" &&
      (params?.quality < 0 || params?.quality > 1))
  )
    throw new Error(
      "width and height must be positive integers, and quality must be a decimal with values into 0 and 1"
    );
  let b64;
  return convertAsyncToURL(file)
    .then((dt) => imageCreator(dt))
    .then((img) => {
      b64 = img;
      return base64ToFile(resizeImageWithCanvas(img, params), file);
    })
    .then((newfile) => ({ b64, file: newfile }));
};