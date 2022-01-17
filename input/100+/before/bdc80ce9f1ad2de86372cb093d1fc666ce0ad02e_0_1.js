function(image, x, y) {
    var canvas, ctx;
    canvas = createCanvas(image.width, image.width);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = ctx.createPattern(image, 'no-repeat');
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(100,100,100,0.2)';
    circle(ctx, image.width / 2, image.width / 2, image.width / 2);
    ctx.translate(x, y);
    ctx.fill();
    ctx.stroke();
    return canvas;
  }