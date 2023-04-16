const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; 
canvas.height = document.body.scrollHeight;
ctx.strokeStyle = '#457b9d';
ctx.lineJoin = 'round'; 
ctx.lineCap = 'round';
ctx.lineWidth = 5;

//where to start a line from and then where to end it
let drawingMode = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(clientX, clientY) {
  if (!drawingMode)
    return; //only run in click and drag

  // ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); //start from
  ctx.lineTo(clientX, clientY); //go to
  ctx.stroke(); //to actually draw the path on canvas
  [lastX, lastY] = [clientX, clientY];
  
  // hue++;
  // if (hue >= 360) {
  //     hue = 0;
  // }
}

canvas.addEventListener('mousemove', (e) => {
  clientX = e.offsetX;
  clientY = e.offsetY;
  // [lastX, lastY] = [clientX, clientY];   // cancel comment to make dotted line
  draw(clientX, clientY);
});
canvas.addEventListener('mousedown', (e) => {
    drawingMode = true;
    [lastX, lastY] = [clientX, clientY]; //on mousedown initiate coordinates for X and Y
});
canvas.addEventListener('mouseup', () => drawingMode = false);
canvas.addEventListener('mouseout', () => drawingMode = false);



// canvas on MOBILE, TABLET
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    [lastX, lastY] = [clientX, clientY];
    drawingMode = true;
    draw(clientX, clientY)
    document.body.classList.add('stop-scrolling');
  }
}, false);

document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    drawingMode = false;
  }
  document.body.classList.remove('stop-scrolling');
}, false);

document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    draw(clientX, clientY)
  }
}, false);


// manage DOM elements and adding event handlers
const controler = document.getElementById('canvas-controls');


document.getElementById('canvas-display').addEventListener('click', () => {
  controler.classList.toggle('shown');
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineWidth = 5;
})

document.getElementById('overlay-btn').addEventListener('click', () => {
  document.querySelector('.overlay').classList.toggle('hide-element');
  controler.classList.remove('h-0');
  controler.classList.toggle('shown');
  // display dark-light mode btn
  darkMode.classList.toggle('w-0');
})

document.getElementById('canvas-platte').addEventListener('click', () => {
  document.getElementById('colors-modal').classList.toggle('w-0');
})

document.getElementById('canvas-draw').addEventListener('click', () => {
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineWidth = 5;
})

document.getElementById('canvas-erase').addEventListener('click', () => {
  ctx.lineWidth = 30;
  ctx.globalCompositeOperation = 'destination-out';
})

document.getElementById('canvas-clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})


// handle color changes
const colorsPlatte = document.querySelectorAll('.color');

colorsPlatte.forEach(e => {
  e.addEventListener('click', () => {
    const color = window.getComputedStyle( e , null).getPropertyValue('background-color');
    ctx.strokeStyle = color;

    // hide colors modal
    document.getElementById('colors-modal').classList.toggle('w-0');
  })
})

const darkMode = document.getElementById('dark-light-mode');
// handle dark-light mode
darkMode.addEventListener('click', () => {
  canvas.classList.toggle('active');
  document.querySelector('.dark-light-mode span').classList.toggle('active');
})