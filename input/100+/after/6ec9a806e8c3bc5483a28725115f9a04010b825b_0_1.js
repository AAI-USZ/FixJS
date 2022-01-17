function() {
  c.fillStyle = '#eee';
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);

  /*
  c.fillStyle = 'black';
  c.beginPath();
  c.arc(100, 100, 100, 0, 2 * Math.PI, false);
  c.fill();
  */

  c.save();
  c.translate((c.canvas.width - this.player.box.width) * 0.5 - this.player.box.x, (c.canvas.height - this.player.box.height) * 0.5 - this.player.box.y);
  this.world.draw();
  this.player.draw();
  c.restore();
  this.testTextBox.draw();
}