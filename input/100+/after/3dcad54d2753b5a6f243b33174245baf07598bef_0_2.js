function(factor) {
    if(factor < 1) {
      // Reset canvas
      canvas.width = 16;

      // Save the state, so we can undo the clipping
      ctx.save();
   
      ctx.beginPath();
      ctx.moveTo(8, 8); // center of the pie
      ctx.arc(  // draw next arc
          8,
          8,
          8,
          Math.PI * (- 0.5), // -0.5 sets set the start to be top
          Math.PI * (- 0.5 + 2 * factor),
          false
      );

      ctx.lineTo(8, 8); // line back to the center
      ctx.closePath();
   
      // Clip to the current path
      ctx.clip();
   
      ctx.drawImage(img, 0, 0);
   
      // Undo the clipping
      ctx.restore();
    }
    else {
      ctx.drawImage(img, 0, 0);
    }

    updateFavicon();
  }