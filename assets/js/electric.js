
//  Script from: https://codepen.io/scorch/pen/rwrWaG

ctrl = {
    numParticles: 90,
    maxRadius: 110,
    hue: 198,
    hueRange: 61,
    fade: 0.43,
    halo: true,
    zappy: true,
    zapComplexity: 2
  }
  
//   var gui = new dat.GUI();
//   gui.add(ctrl, 'numParticles', 1, 150).step(1);
//   gui.add(ctrl, 'maxRadius', 30, 150).step(1);
//   gui.add(ctrl, 'hue', 0, 359).step(1);
//   gui.add(ctrl, 'hueRange', 0, 180).step(1);
//   gui.add(ctrl, 'fade', 0, 0.4).step(0.001);
//   gui.add(ctrl, 'zapComplexity', 0, 4).step(1);
//   gui.add(ctrl, 'halo');
//   // gui.add(ctrl, 'zappy');
  
  
  // create a canvas element
  var canvas = document.createElement("canvas")
  
  // attach element to DOM
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  
  // background color [r, g, b] 
  var bg = [1, 22, 39]
  
  var wh = window.innerHeight
  // get the canvas context (this is the part we draw to)
  var ctx = canvas.getContext("2d")
  
  function setup() {
    // setup the canvas size to match the window
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight + $('#about').height() * 2
    
    wh = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
    
    // set the 0,0 point to the middle of the canvas, this is not necessary but it can be handy
    ctx.translate(canvas.width / 2, window.innerHeight / 2)
    
    fill(bg, 1)
  }
  
  // fill entire canvas with a preset color
  function fill(rgb, amt) {
    ctx.beginPath(); // start path
    ctx.rect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height) // set rectangle to be the same size as the window
    ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${amt})` // use the rgb array/color for fill, and amt for opacity
    ctx.fill() // do the drawing
  }
  
  function drawCircle(x, y, r, color) {
    ctx.beginPath()
    ctx.arc(x ,y , r, 0, 2 * Math.PI)
    ctx.fillStyle = color || 'white'
    ctx.fill()
    ctx.closePath()
  }
  
  function Particle() {
    // initialize loopers with random trange and offset
    this.loop1 = new Looper(1250 + 170 * Math.random(), 11000 * Math.random()) 
    this.loop2 = new Looper(800 + 950 * Math.random(), 10000 * Math.random())
    this.loop3 = new Looper(400 + 920 * Math.random(), 9000 * Math.random())
    this.history = []
    this.history_max = 1
    this.c = ``
    this.hsv = {}
    this.offset = Math.random() // some color offset for the color
    this.signals = 0 // count connection - update every frame
    this.sstrength = 0 // running average using signals
    
    this.destroy = function () {
      this.loop1 = null
      this.loop2 = null
      this.loop3 = null
      this.history = null
      this.history_max = null
      this.c = null
      this.hsv = null
      this.offset = null
      delete this
    }
    
    this.draw = function (){
      
      this.sstrength = this.signals * 0.02  + this.sstrength * 0.91;
  
      this.loop1.update() // update looper
      this.loop2.update() // update looper
      this.loop3.update() // update looper
      
      // set x,y, radius, and color params
      var x = this.loop1.sin * (canvas.width / 4 ) + this.loop2.sin * (canvas.width / 3 ) * this.loop3.cos * this.loop2.sin
      var y = this.loop1.cos * (canvas.height / 4 ) + this.loop2.cos * (canvas.height / 3 ) * this.loop3.cos * this.loop2.sin
      // var r = 0.2 + 3 * this.loop1.sinNorm * this.loop2.sinNorm // set the radius
      this.hsv = {
        // this is where we set the color...
        h:ctrl.hue + ctrl.hueRange * (this.loop3.cosNorm + this.offset) * this.loop2.sinNorm,
        // the saturation depends on the loop
        s:80 + 7 * this.loop1.sinNorm,
        // ..and so does the value - we want to keep that close to 50%
        v:70 + 5 * this.loop3.sin
      }
      this.c = `hsla(${this.hsv.h}, ${this.hsv.s}%, ${this.hsv.v}%, ${1})`
      
      if(ctrl.halo){
        var grd=ctx.createRadialGradient(Math.round(x), Math.round(y),0, Math.round(x), Math.round(y), ctrl.maxRadius);
        grd.addColorStop(0.0, `hsla(${this.hsv.h}, ${this.hsv.s}%, ${this.hsv.v}%, ${0.1 * this.sstrength})`);
        // grd.addColorStop(0.2, `hsla(${this.hsv.h}, ${this.hsv.s}%, ${this.hsv.v}%, ${0.03 * this.sstrength})`);
        grd.addColorStop(0.9, `hsla(${this.hsv.h}, ${this.hsv.s}%, ${this.hsv.v}%, ${0})`);
        drawCircle(x, y, ctrl.maxRadius, grd);  // draw the circle  
      }
      
      this.history = [[x, y]]
      this.signals = 0; 
    }
    
    this.addSignal = function () {
      this.signals ++;
    }
  }
  
  // initialize a set of particle
  var particles = []
  
  function draw() {
    // fill context with background color 
    fill(bg, ctrl.fade)
    
    //add particles
    while (particles.length < ctrl.numParticles){
      particles.push(new Particle())
    }
    // drop old particles
    while (particles.length >= ctrl.numParticles){
      particles.pop().destroy()
    }
    
    var x0
    var y0
    var x1
    var y1
    var d
    var r = ctrl.maxRadius * ctrl.maxRadius
    var s
    
    // update all the particles
    for (var i = 0; i < particles.length; i ++) {
      particles[i].draw() // do it once
      
      for (var j = 0; j < i; j ++) { 
        if(particles[j] && particles[j].history && particles[j].history.length > 0 ) {
          
          x0 = particles[i].history[0][0]
          y0 = particles[i].history[0][1]
          x1 = particles[j].history[0][0]
          y1 = particles[j].history[0][1]
          d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)
          if (d < r && d > 50) {
            
            particles[i].addSignal();
            particles[j].addSignal();
            
            s = 1 - Math.sin(d / r * d / r * Math.PI / 2)
            
            if(!ctrl.zappy) {
              // straight line
              ctx.beginPath();
              ctx.moveTo(x0, y0);
              ctx.lineTo(x1, y1);
              ctx.lineWidth = s * 1.6;
              ctx.strokeStyle = particles[i].c
              ctx.stroke()
              ctx.closePath()
            } else {
              // zappy line
              var iterations = [{x: x0, y:y0},{x: x1, y:y1}]
              var newiterations, ii, ij
              for (ii = 0; ii < ctrl.zapComplexity; ii++) {
                newiterations = [iterations[0]]
                for(ij = 1; ij < iterations.length; ij++) {
                  newiterations.push(getRandMidpoint(iterations[ij-1], iterations[ij], ctrl.maxRadius/3/(ii*ii+1) * (1 - s * 0.7)))
                  newiterations.push(iterations[ij])
                }
                iterations = newiterations.concat([])
              }
              ctx.beginPath();
              ctx.moveTo(iterations[0].x, iterations[0].y);
              ctx.lineWidth = s * 1.6;
              ctx.strokeStyle = particles[i].c
              for (ii = 1; ii < iterations.length; ii++) {
                ctx.lineTo(iterations[ii].x, iterations[ii].y);
              }
              ctx.stroke()
              ctx.closePath()
            }
          }
        }
      }
    }
    
    // this is a draw loop, this will execute frequently and is comparable to EnterFrame on other platform
    window.requestAnimationFrame(function(){draw()})
  }
  
  // start enterFrame loop
  window.requestAnimationFrame(draw);
  
  // force running setup
  setup()
  
  // re-setup canvas when the size of the window changes 
  window.addEventListener("resize", setup)
  
  // create a class to hold value and have built in incrementing functionality
  function Looper (steps, start) {
    this.val = start || 0 // set value to start value if defined, or 1
    this.steps = steps || 100 // set steps to passed value or default to 100
    this.norm = this.val / this.range // initialize normalized value (between 0 and 1)
    this.sin = Math.sin(this.norm * Math.PI * 2) // get sine value from norm normalized to [0, 2PI]
    this.sinNorm = (this.sin + 1) / 2 // normalize sin to [0,1]
    this.cos = Math.cos(this.norm * Math.PI * 2) // get cosine value from norm normalized to [0, 2PI]
    this.cosNorm = (this.cos + 1) / 2 // normalize cos to [0,1]
    
    this.update = function () {
      this.val = (this.val + 1) % this.steps // update value
      this.norm = this.val / this.steps // update normalize value (between 0 and 1)
      this.sin = Math.sin(this.norm * Math.PI * 2) // get sine value from norm normalized to [0, 2PI]
      this.sinNorm = (this.sin + 1) / 2 // normalize sine to [0,1]
      this.cos = Math.cos(this.norm * Math.PI * 2) // get cosine value from norm normalized to [0, 2PI]
      this.cosNorm = (this.cos + 1) / 2 // normalize cos to [0,1]
    }
  }
  
  function getRandMidpoint (pa, pb, range) {
    var a = Math.atan2(pb.y-pa.y, pb.x-pa.x) + Math.PI/2
    var half = {y:(pb.y-pa.y)/2 + pa.y, x:(pb.x-pa.x)/2 + pa.x}
    var offset = Math.random() * range - range/2
    var ho = {
      x: Math.cos(a) * offset + half.x,
      y: Math.sin(a) * offset + half.y
    }
    return ho
  }