function(){
  var canvas = document.getElementById("me");
  var ctx = meCtx = canvas.getContext("2d");
  var pressed;
  var position;

  var points = [];
  var lastSent = 0;

  function addPoint (x, y) {
    points.push({ x: x, y: y });
  }
  function sendPoints () {
    lastSent = +new Date();
    send({ type: "trace", points: points, num: numTrace });
    points = [];
  }
  function sendMove (x, y) {
    lastSent = +new Date();
    send({ type: "move", x: x, y: y });
  }

  function canSendNow () {
    return +new Date() - lastSent > MIN_SEND_RATE;
  }

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  function positionWithE (e) {
    var o = $(canvas).offset();
    var x = e.clientX, y = e.clientY;
    if (e.touches) {
      var touch = e.touches[0];
      if (touch) {
        x = touch.pageX;
        y = touch.pageY;
      }
    }
    return { x: x-(o.left-$(window).scrollLeft()), y: y-(o.top-$(window).scrollTop()) };
  }

  function lineTo(x, y) {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(x, y);
      ctx.stroke();
  }

  function onMouseMove (e) {
    e.preventDefault();
    var o = positionWithE(e);
    if (pressed) {
      lineTo(o.x, o.y);
      addPoint(o.x, o.y);
      ++ numTrace;
      if (canSendNow()) {
        sendPoints();
        addPoint(o.x, o.y);
      }
    }
    else {
      if (canSendNow()) {
        sendMove(o.x, o.y);
      }
    }
    position = o;
  }

  function onMouseDown (e) {
    e.preventDefault();
    var o = positionWithE(e);
    position = o;
    addPoint(o.x, o.y);
    pressed = true;
  }

  function onMouseUp (e) {
    e.preventDefault();
    lineTo(position.x, position.y);
    addPoint(position.x, position.y);
    sendPoints();
    pressed = false;
  }



  document.addEventListener(isMobile ? "touchstart": "mousedown", onMouseDown);
  document.addEventListener(isMobile ? "touchend"  : "mouseup",   onMouseUp);
  viewport.addEventListener(isMobile ? "touchmove" : "mousemove", onMouseMove);

}