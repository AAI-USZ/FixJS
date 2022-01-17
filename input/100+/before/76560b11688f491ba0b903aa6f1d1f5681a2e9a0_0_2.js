function mouseUp(e){
  if(carriedPiece&&e.pageX&&e.pageY){
    var mouseX = e.pageX - mouseRange.l,mouseY = e.pageY - mouseRange.t;
    if(mouseX>=0&&mouseX<=mouseRange.w&&mouseY>=0&&mouseY<=mouseRange.h)
    {
      if(mouseY<distribute.t){ // 判斷是否需要放到map上
        var r,c;
        for(r = 0;r<(ROWS-1);r++) if((r+0.5)*pieceHeight>mouseY) break;
        for(c=0;c<(COLS-1);c++) if(((c+0.5)*pieceWidth+mapLeft)>mouseX) break;
        if(inmap[r*ROWS+c]){
          carriedPiece.elm.style.left = carriedPiece.oX + 'px';
          carriedPiece.elm.style.top = carriedPiece.oY + 'px';
        }else{
          carriedPiece.elm.style.left = (c*pieceWidth+mapLeft) + 'px';
          carriedPiece.elm.style.top = r*pieceHeight + 'px';
          inmap[r*ROWS+c] = carriedPiece.seq;
          updateComplete();
        }
      }else{
        carriedPiece.elm.style.left = mouseX + 'px';
        carriedPiece.elm.style.top = mouseY + 'px';
      }
    }else{
        carriedPiece.elm.style.left = carriedPiece.oX + 'px';
        carriedPiece.elm.style.top = carriedPiece.oY + 'px';
    }
        carriedPiece.oX = null;
        carriedPiece.oY = null;
        carriedPiece = null;
  }
}