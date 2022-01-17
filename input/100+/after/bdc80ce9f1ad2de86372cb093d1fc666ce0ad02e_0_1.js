function(image, size, x, y) {
    var canvas, ctx;
    canvas = createCanvas(size, size);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = ctx.createPattern(image, 'no-repeat');
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(100,100,100,0.2)';
    circle(ctx, size / 2, size / 2, size / 2);
    ctx.translate(x, y);
    ctx.fill();
    ctx.stroke();
    return canvas;
  }