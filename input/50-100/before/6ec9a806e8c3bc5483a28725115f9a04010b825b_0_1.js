function Game() {
  this.paused = false;
  this.world = new World();
  //this.player = new PlayerPlane();
  this.player = new PlayerHuman();
}