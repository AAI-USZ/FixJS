function() {
  //for debugging
  var c = document.getElementById('guide-the-ball');
  var ctx = c.getContext('2d');
  c.width = c.width;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '10px Calibri';
  ctx.fillText(this.orientation['alpha'], c.width / 2, (c.height / 2.3) + 20);
  ctx.fillText(this.orientation['beta'], c.width / 2, (c.height / 2.3) + 40);
  ctx.fillText(this.orientation['gamma'], c.width / 2, (c.height / 2.3) + 60);
}