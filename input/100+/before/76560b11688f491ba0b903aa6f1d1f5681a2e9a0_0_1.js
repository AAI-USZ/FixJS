function mouseDown(e){
  if(carriedPiece){
    return;
  }
  if(e.pageX&&e.pageY){
    var mouseX = e.pageX - mouseRange.l,mouseY = e.pageY - mouseRange.t;
    if(mouseX>=0&&mouseX<=mouseRange.w&&mouseY>=0&&mouseY<=mouseRange.h){
      var piece;
      for(var i = 0;i<pieces.length;i++){
        piece = pieces[i];
        var iX = mouseX - piece.elm.offsetLeft,iY = mouseY -piece.elm.offsetTop;
        if(iX>=0&&iX<=piece.elm.offsetWidth&&iY>=0&&iY<=piece.elm.offsetHeight){
          carriedPiece = piece;
          carriedPiece.oX = carriedPiece.elm.offsetLeft;
          carriedPiece.oY = carriedPiece.elm.offsetTop;
          carriedPiece.elm.style.zIndex = zCount++;
          for(var i =0;i<(ROWS*COLS);i++) if(inmap[i]==carriedPiece.seq) inmap[i] = null;
          break;
        }
      }
    }
  }
}