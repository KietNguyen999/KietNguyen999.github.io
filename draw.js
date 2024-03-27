/** @type {HTMLInputElement} */
const threshold = document.getElementById("threshold");

/** @type {HTMLVideoElement} */
const video = document.getElementById("video");

/** @type {HTMLCanvasElement} */
const inCanvas = document.getElementById("preprocess");
const inContext = inCanvas.getContext("2d", { willReadFrequently: true });

/** @type {HTMLCanvasElement} */
const outCanvas = document.getElementById("processed");
const outContext = outCanvas.getContext("2d");

let width = video.videoWidth;
let height = video.videoHeight;

function draw() {
  width = video.videoWidth;
  height = video.videoHeight;

  inCanvas.width = width;
  inCanvas.height = height;
  outCanvas.width = width;
  outCanvas.height = height;

  inContext.drawImage(video, 0, 0, width, height);
  let image = inContext.getImageData(0, 0, width, height);
  image = extractboundbyoper(image, 3);
  outContext.putImageData(image, 0, 0);

  if (video.paused || video.ended) return false;
  setTimeout(draw, 1000 / 60);
}

video.onloadeddata = function (e) {
  draw();
};

video.onplay = function (e) {
  draw();
};

video.ondurationchange = function (e) {
  if (video.paused || video.ended) {
    draw();
  }
};

threshold.oninput = function (e) {
    const value = document.getElementById("threshold-value");
    value.innerHTML = threshold.value;
    draw();
}
