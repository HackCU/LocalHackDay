// Based mainly on https://github.com/Reynau/space/ by @reynau
// Edited by @casassg
// It looks good mate!


$(function() {
  var renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: true, transparent: true });
  renderer.view.style.width = "100%";
  renderer.view.style.height = "100%";
  document.body.insertBefore(renderer.view, document.body.childNodes[0]);

  var paused = false;




  var stage = new PIXI.Container();
  var startTime = null;
  var angle = 0;
  // Init sprites
  var circle = createCircleSprite();

  // Constants
  var numStars = 1000;

  // Init stars
  var stars = [];
  for(var i=0; i<numStars; i++) {
    var s = createStar();
    stars.push(s);
    stage.addChild(s);
  }
  renderer.render(stage);


function update(dt) {
    angle += 0.6*dt;

    var W = renderer.view.width;
    var H = renderer.view.height;
    var sinInc = Math.sin(angle) * 120 * dt;

    for (var i = 0; i < numStars; i++) {
      var leave =stars[i];

      if(leave != undefined) {
        leave.y += (Math.cos(angle + leave.weight) + 1 + leave.width / 25) * 60 * dt;
        leave.x += sinInc;

        // Sending flakes back from the top when it exits
        // Lets make it a bit more organic and let flakes enter from the left and right also.
        if (leave.x > W +  5 || leave.x < -5 || leave.y > H) {
          if (i % 10 > 1) /* 66.67% of the flakes */ {
            stars[i].x = Math.random() * W;
            stars[i].y = - 5;
          } else {
            // If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              stars[i].x = -5;
              stars[i].y = Math.random() * H;
            } else {
              stars[i].x = W + 5;
              stars[i].y = Math.random() * H;
            }
          }
        }
      }
    }
  }
  

  function mainLoop(timestamp) {
    requestAnimationFrame(function(ts) {mainLoop(ts)});

    if(startTime == null) startTime = timestamp;
    var dt = (timestamp - startTime)/700;
    startTime = timestamp;

    if(paused == false) {
      renderer.render(stage);

      update(dt);
    }
  }

  // Sprite constructors
  function createCircleSprite () {
    var circle = new PIXI.RenderTexture(renderer, 16, 16);
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.drawCircle(8, 8, 1);
    graphics.endFill();
    circle.render(graphics);
    return circle;
  }

  // Element constructors
  function createStar () {
    var s = new PIXI.Sprite(circle);
    var scale = Math.random() * 2;
    s.position.x = Math.random() * renderer.width;
    s.position.y = Math.random() * renderer.height;
    s.alpha = Math.random();
    s.weight = Math.random() * 40;
    s.scale.x = scale;
    s.scale.y = scale;
    return s;
  }

  function resize () {
    renderer.resize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', resize , false)
  resize()

  requestAnimationFrame(function(ts) {mainLoop(ts)});

})