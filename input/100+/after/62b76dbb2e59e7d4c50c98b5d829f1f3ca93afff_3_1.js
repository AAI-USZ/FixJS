function mouseUp(e){
  if(carriedPiece&&e.pageX&&e.pageY){
    var mouseX = e.pageX - mouseRange.l,mouseY = e.pageY - mouseRange.t;
    var picX = mouseX - carriedMouseXOffset, picY = mouseY - carriedMouseYOffset;
    if(picX>=0&&picX<=mouseRange.w&&picY>=0&&picY<=mouseRange.h)
    {
      if(picY<distribute.t){ // 判斷是否需要放到map上
        var r,c;
        for(r = 0;r<(ROWS-1);r++) if((r+0.5)*pieceHeight>picY) break;
        for(c=0;c<(COLS-1);c++) if(((c+0.5)*pieceWidth+mapLeft)>picX) break;
        if(inmap[r*ROWS+c]!=null){
          carriedPiece.elm.style.left = carriedPiece.oX + 'px';
          carriedPiece.elm.style.top = carriedPiece.oY + 'px';
          inmap[carriedPiece.oInmap] = carriedPiece.seq;
          carriedPiece.oInmap = null;
        }else{
          carriedPiece.elm.style.left = (c*pieceWidth+mapLeft) + 'px';
          carriedPiece.elm.style.top = r*pieceHeight + 'px';
          carriedPiece.oInmap = null;
          inmap[r*ROWS+c] = carriedPiece.seq;
          updateComplete();
        }
      }else{
        carriedPiece.elm.style.left = picX + 'px';
        carriedPiece.elm.style.top = picY + 'px';
        inmap[carriedPiece.oInmap] = carriedPiece.seq;
      }
    }else{
        carriedPiece.elm.style.left = carriedPiece.oX + 'px';
        carriedPiece.elm.style.top = carriedPiece.oY + 'px';
        inmap[carriedPiece.oInmap] = carriedPiece.seq;
    }
        carriedPiece.oX = null;
        carriedPiece.oY = null;
        carriedPiece = null;
  }
}