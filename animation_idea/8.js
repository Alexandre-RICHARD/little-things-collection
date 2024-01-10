var canvas = document.createElement("canvas"),
  c = canvas.getContext("2d");
var w = (canvas.width = window.innerWidth),
  h = (canvas.height = window.innerHeight);

document.body.appendChild(canvas);

c.fillStyle = "rgba(30,30,30,1)";
c.fillRect(0, 0, w, h);

var res = 20,
  cols = Math.ceil(w / res),
  rows = Math.ceil(h / res),
  arr = new Array(cols),
  x0 = 0,
  y0 = 0;

class vector {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.l = res;
    this.needsDraw = true;
    this.framesSinceDraw = 0;
  }
  calc(mx, my) {
    this.q = 1;
    this.dist = Math.sqrt(Math.pow(this.y - my, 2) + Math.pow(this.x - mx, 2));
    if (this.dist < this.l) {
      this.de = this.l - this.dist;
      this.l -= this.de / 100;
    } else if (this.dist > this.l * 2) {
      this.l = res * 2 - res * 2 / (100 / this.dist);
    }
    if (this.l < 0) {
      this.l = res / 3;
      this.q = -1;
    }
    this.a = Math.atan2(this.y - my, this.x - mx);
    //this.a = Math.atan2(my-this.y,mx-this.x);
    this.lnx = this.nx;
    this.lny = this.ny;
    this.nx = this.x + this.l * Math.cos(this.a) * this.q;
    this.ny = this.y + this.l * Math.sin(this.a) * this.q;

    if (this.dist < 100 || this.framesSinceDraw < this.dist / 300 + 1) {
      this.needsDraw = true;
    }
  }
  show() {
    if (this.dist <= this.l * 3) {
      this.bs = res / 10 + (res / 5 - res / 5 / (this.l * 3 / this.dist));
    } else {
      this.bs = res / 10;
    }

    c.beginPath();
    c.arc(this.nx, this.ny, this.bs, 0, 2 * Math.PI);
    c.fillStyle = "white";
    c.fill();

    c.beginPath();
    c.lineTo(this.x, this.y);
    c.lineTo(this.nx, this.ny);
    c.strokeStyle = "white";
    c.lineWidth = "1";
    c.stroke();
  }
  show2() {
    c.beginPath();
    c.arc(this.x, this.y, this.bs/2, 0, 2 * Math.PI);
    c.fillStyle = "black";
    c.fill();
    this.needsDraw = false;
    this.framesSinceDraw = 0;
  }
  clear() {
    c.clearRect(this.x - res / 2, this.y - res / 2, res, res);
  }
}

for (var x = 0; x < cols; x++) {
  arr[x] = new Array(rows);
  for (var y = 0; y < rows; y++) {
    arr[x][y] = new vector(res * x + res / 2, res * y + res / 2);
  }
}

function draw() {
  x0 += (mouse.x - x0) / 1;
  y0 += (mouse.y - y0) / 1;
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      arr[x][y].calc(x0, y0);
      if (arr[x][y].needsDraw) {
        arr[x][y].clear();
      } else {
        arr[x][y].framesSinceDraw++;
      }
      arr[x][y].show2();
    }
  }
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      arr[x][y].show();
    }
  }
}

var mouse = {
  x: w / 2,
  y: h / 2
};
var last_mouse = {
  x: 0,
  y: 0
};

canvas.addEventListener(
  "mousemove",
  function(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  },
  false
);

canvas.addEventListener(
  "mouseleave",
  function(e) {
    mouse.x = w/2;
    mouse.y = h/2;
  });

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function loop() {
  setTimeout(function() {
    window.requestAnimFrame(loop);
    // c.fillStyle = "rgba(30,30,30,1)";
    // c.fillRect(0, 0, w, h);
    draw();
  }, 1000 / 60);
}

window.addEventListener("resize", function() {
  (w = canvas.width = window.innerWidth),
    (h = canvas.height = window.innerHeight);
  c.fillStyle = "rgba(30,30,30,0)";
  c.fillRect(0, 0, w, h);
});

loop();