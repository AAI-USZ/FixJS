function(){

  if(this.solved){
    this.game.chimes.play();
    if(this.has_voice)
      this.voice.play();
    if(this.has_sound)
      this.sound.play();
    this.game.context.drawImage(this.img, (this.game.canvas.width/2)-(this.img.width/2), (this.game.canvas.height/2)-(this.img.height/2));
    this.solved = false;
  }
  else{

  //HOLDERS
  for(var i = 0; i < this.holders.length; i++){
    this.holders[i].draw();
    //this.pieces[i].draw();
  }

  //PIECES
  var not_placed = new Array();
  var over = false;
  for(var i = 0; i < this.pieces.length; i++){
    piece = this.pieces[i];
    /*
    if(!over && piece.mouse_is_over())
      over = true;
    */
    if(!piece.placed)
      not_placed.push(piece);
    else if(piece != this.game.selected)
      piece.draw();
    /*  
    if(over && !this.game.selected){
      if((!this.game.over)||(this.game.over.id < piece.id)||(piece.mouse_is_over())){
        if(piece.mouse_is_over() && !piece.placed){
          this.game.over = piece;
        }
      }
    }
    */
    
  }
  
  if(!over){
    this.game.over = null;
  }

  //move
  if((this.game.selected != null)&&(this.game.selected.moveble)){
    this.game.selected.x = this.game.mouse.x;
    this.game.selected.y = this.game.mouse.y;
  }
  
  //NOT PLACED PIECES  
  for(var i = 0; i < not_placed.length; i++){
    not_placed[i].draw();
  }
  if(this.game.selected)
    this.game.selected.draw();
  
  //move
  if((this.game.selected != null)&&(this.game.selected.moveble)){
    this.game.selected.position.x = this.game.mouse.x-this.game.selected.img.width/2;
    this.game.selected.position.y = this.game.mouse.y-this.game.selected.img.height/2;
  }
  
  //Game Over
  if(this.remaining_time <= 0){
    window.m.stopGame();
    if(confirm('Timeup! Game Over! Wanna try again?')){
      this.game.is_over = false;
      this.game.init();
      window.m.startGame();
    }
  }
  else{
    if(this.game.is_over){
      window.m.pauseGame();
      $('#stage').html("Stage "+this.game.stage+" completed!");
      $('#pieces').html(this.num_pieces+" pieces in "+(this.time_to_complete-this.remaining_time)+"s");
      $('#modal-success').modal();
    }else{
      //console.log(this.num_pieces+" - "+this.game.placed_pieces.length)
      if(this.num_pieces == this.game.placed_pieces.length){
        this.game.is_over = true;
        this.solved = true;
      }
    }
  }
  
  }

}