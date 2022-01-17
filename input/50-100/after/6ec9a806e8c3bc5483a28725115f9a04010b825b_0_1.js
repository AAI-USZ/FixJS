function Game() {
  this.paused = false;
  this.world = new World();
  //this.player = new PlayerPlane();
  this.player = new PlayerHuman();
  this.testTextBox = new TextBox("Unnnnhhhhhh...Where am I?  Where's my helmet?  Where's my plane?", 350, c.canvas.width / 2, 100);
}