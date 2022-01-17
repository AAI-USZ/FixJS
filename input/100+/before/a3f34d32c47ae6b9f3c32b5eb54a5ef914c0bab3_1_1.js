function drawSliderBars() {
  var ctx = document.getElementById('gamecanvas').getContext('2d');  
  ctx.save();
  ctx.fillStyle = 'rgba(256,256,256,.5)';
  ctx.fillRect(0,0,500,500);

  ctx.lineWidth = 20;
  ctx.strokeStyle = "orange";
  ctx.lineCap = "round";
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(25,250);
  ctx.lineTo(475,250);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(250,25);
  ctx.lineTo(250,475);
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "green";
  ctx.lineCap = "square";

  ctx.beginPath();
  ctx.moveTo(25,250);
  ctx.lineTo(475,250);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(250,25);
  ctx.lineTo(250,475);
  ctx.stroke();

  ctx.beginPath();
  ctx.globalAlpha = .7;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 15;
  ctx.arc(250,250,slider.precision,0, 2 * Math.PI, false);
  ctx.stroke();

  ctx.globalAlpha = 1;
  for (var i=0;i<4;i++){  
    ctx.beginPath();  
    ctx.rotate(Math.PI/2);  
    ctx.moveTo(250 + 3 * slider.precision/4,250);  
    ctx.lineTo(250 + 5 * slider.precision/4,250);  
    ctx.stroke();  
  }  
  ctx.restore();
}