var canvas,
  context,
  dragging = false,
  dragStartLocation,
  snapshot;

function getCanvasCoordinates(event) {
  var x = event.clientX - canvas.getBoundingClientRect().left,
    y = event.clientY - canvas.getBoundingClientRect().top;
  return { x: x, y: y };
}
function takeSnapshot() {
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreSnapshot() {
  context.putImageData(snapshot, 0, 0);
}
function drawTriangle(position, sides, angle) {
  var coordinates = [];
  var radius = Math.sqrt(
    Math.pow(dragStartLocation.x - position.x, 2) +
      Math.pow(dragStartLocation.y - position.y, 2)
  );
  index = 0;
  for (index = 0; index < sides; index++) {
    coordinates.push({
      x: dragStartLocation.x + radius * Math.cos(angle),
      y: dragStartLocation.y - radius * Math.sin(angle),
    });
    angle += (2 * Math.PI) / sides;
  }
  context.beginPath();
  context.moveTo(coordinates[0].x, coordinates[0].y);
  for (index = 1; index < sides - 1; index++) {
    context.lineTo(coordinates[index].x, coordinates[index].y);
  }
  context.closePath();
  context.fill();
}
function drawLine(position) {
  context.beginPath();
  context.moveTo(dragStartLocation.x, dragStartLocation.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

function dragStart(event) {
  dragging = true;
  dragStartLocation = getCanvasCoordinates(event);
  takeSnapshot();
}

function drag(event) {
  var position;
  if (dragging === true) {
    restoreSnapshot();
    position = getCanvasCoordinates(event);
    // drawLine(position);
    drawTriangle(position, 4, 0);
  }
}

function dragStop(event) {
  dragging = false;
  restoreSnapshot();
  var position = getCanvasCoordinates(event);
  // drawLine(position);
  drawTriangle(position, 4, 0);
}
function clearcanvas1() {
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function randomcolor() {
  var colors = ["#ff0000", "#00ff00", "#0000ff"];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  context.fillStyle = random_color;
}

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  context.strokeStyle = "black";

  context.lineWidth = 6;
  context.linecap = "round";
  canvas.addEventListener("mousedown", dragStart, false);
  canvas.addEventListener("mousemove", drag, false);
  canvas.addEventListener("mouseup", dragStop, false);
}
window.addEventListener("load", init, false);
