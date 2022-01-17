function(opts) {
    // { dice: Dice (array of DicePieces), currentPlayer: Player, mePlayer: Player, otherPlayer: Player, pCanConfirm: boolean, pCanRoll: boolean } 
    
    this.drawingContext.save();    
    
    // clear entire dice area
	var off = 3;
    this.drawingContext.clearRect(this.interact.dice.startX - off, this.interact.dice.startY - off, this.interact.dice.widthPix + off,  this.interact.dice.heightPix + off); 
    this.drawingContext.drawImage(this.nakedCanvasElement, this.interact.dice.startX - off, this.interact.dice.startY - off, this.interact.dice.widthPix + off, this.interact.dice.widthPix + off, this.interact.dice.startX - off, this.interact.dice.startY - off, this.interact.dice.widthPix + off, this.interact.dice.widthPix + off);
	
    // draw each individual dice
    var fs  = ( opts.dice.isRolled ) ? opts.currentPlayer.color : opts.otherPlayer.color;
    for ( var d = 0; d < opts.dice.dice.length; d++ ) {
      var pos = ( d + 1 ) % 4; // center the dice when there are only two... current looks funny when you have doubles and you move one at a time...

      this.drawingContext.globalAlpha = ( opts.dice.dice[d].isUsed ) ? this.interact.dice.alphaUsed : this.interact.dice.alphaUnused;
      this.drawingContext.fillStyle = fs;
      this.drawingContext.fillRect(this.interact.dice.startX + this.interact.dice.piecePadding +  pos * (this.interact.dice.pieceWidth  + this.interact.dice.piecePadding), 
                                   this.interact.dice.startY, 
                                   this.interact.dice.pieceWidth, this.interact.dice.pieceHeight);
      var ss = opts.currentPlayer.color;
	  if ( opts.pCanConfirm && opts.mePlayer.num == opts.otherPlayer.num ) ss = opts.otherPlayer.color;
	  if ( opts.pCanRoll ) ss = opts.currentPlayer.color;
	  if (opts.pCanConfirm || opts.pCanRoll) {
	    this.drawingContext.globalAlpha = .5; //( dice.dice[d].isUsed ) ? this.interact.dice.alphaUsed : this.interact.dice.alphaUnused;
		this.drawingContext.lineWidth = 3;
        this.drawingContext.strokeStyle =  ss;
        this.drawingContext.strokeRect(this.interact.dice.startX + this.interact.dice.piecePadding +  pos * (this.interact.dice.pieceWidth  + this.interact.dice.piecePadding), 
                                       this.interact.dice.startY, 
                                       this.interact.dice.pieceWidth, this.interact.dice.pieceHeight);
	  }
	  
      // display dice value
      this.drawingContext.fillStyle = "#FF4040";
      this.drawingContext.globalAlpha += .2;
      this.drawingContext.font = "15pt Arial";
      this.drawingContext.fillText(opts.dice.dice[d].value, 
                                  this.interact.dice.startX + this.interact.dice.piecePadding +  pos * (this.interact.dice.pieceWidth  + this.interact.dice.piecePadding) + ((this.interact.dice.pieceWidth - this.interact.dice.piecePadding )/2) , 
                                  this.interact.dice.startY + ( (this.interact.dice.pieceHeight + this.interact.padding) / 2 ));       
    }
    this.drawingContext.restore();
  }