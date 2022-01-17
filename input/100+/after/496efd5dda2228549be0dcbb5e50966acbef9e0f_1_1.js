function mouseUp(e){
  if(carriedPiece&&e.pageX&&e.pageY){
    var mouseX = e.pageX - mouseRange.l,mouseY = e.pageY - mouseRange.t;
    var picX = mouseX - carriedMouseXOffset, picY = mouseY - carriedMouseYOffset;
    if(mouseX>=0&&mouseX<=mouseRange.w&&mouseY>=0&&mouseY<=mouseRange.h)//判斷是不是在container內
    {
      if(mouseY<distribute.t){ // 判斷是否需要放到map上
        var r,c;
        for(r = 0;r<(ROWS-1);r++) if((r+1)*pieceHeight>mouseY) break;
        for(c=0;c<(COLS-1);c++) if(((c+1)*pieceWidth+mapLeft)>mouseX) break;
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
      }else{//在map外
        carriedPiece.elm.style.left = picX + 'px';
        carriedPiece.elm.style.top = picY + 'px';
      }
    }else{//在container外
        carriedPiece.elm.style.left = carriedPiece.oX + 'px';
        carriedPiece.elm.style.top = carriedPiece.oY + 'px';
        inmap[carriedPiece.oInmap] = carriedPiece.seq;
    }
    carriedPiece.oInmap=null;
        carriedPiece.oX = null;
        carriedPiece.oY = null;
        carriedPiece = null;
  }
}