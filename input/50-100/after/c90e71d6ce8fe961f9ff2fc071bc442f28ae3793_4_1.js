function(x,y) {
    var bakx=this.x;
    var baky=this.y;
    safeMove(this,this.x+x,this.y+y);
    this.update();
    //We cannot just use this.x-x because this would cause trouble at the edges of the map
    //We need to do this after the update, so that the object is not out of the game area when its position is registered in the matrix
    postMortemDebug='opc from ('+bakx+','+baky+') to ('+this.x+','+this.y+')';
    objectPositionChanged(this.parent,bakx,baky,this.x,this.y);
  }