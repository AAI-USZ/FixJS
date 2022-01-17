function mouseMove(e){
  if(carriedPiece&&e.pageX&&e.pageY){
    var mouseX = e.pageX - mouseRange.l,mouseY = e.pageY - mouseRange.t;
    if(mouseX>=0&&mouseX<=mouseRange.w&&mouseY>=0&&mouseY<=mouseRange.h)
    {
      carriedPiece.elm.style.left = mouseX + 'px';
      carriedPiece.elm.style.top = mouseY + 'px';
    }
  }

}