function resizeGame() {  
  console.log("window: " + window.innerWidth + ", " + window.innerHeight)
  //if(game.started){
    game.resized = true;
    game.init();
 //}
}