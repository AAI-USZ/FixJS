function drawFilledDataLine(ctx, scaleF, data, strokeStyle, fillStyle) {
     ctx.beginPath();
     ctx.strokeStyle = strokeStyle;
     ctx.fillStyle = fillStyle;
     startY = eHeight - (data[0] / scaleF) + yoffset + 1;
     ctx.moveTo(cOriginX + 1, startY);
     for (i=0; i<data.length; i++) {
          pos_y = eHeight - (data[i] / scaleF) + yoffset;
          ctx.lineTo(cOriginX + i*2 + 1, pos_y);
     }
     ctx.lineTo(cOriginX + i*2, eHeight - 1 + yoffset);
     ctx.lineTo(cOriginX + 1, eHeight - 1 + yoffset);
     ctx.lineTo(cOriginX + 1, startY);
     ctx.closePath();
     ctx.fill();
     ctx.stroke();
}