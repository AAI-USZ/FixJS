function randomisePieces(){
  var i;
  for(i = 0; i < pieces.length; i++){
    pieces[i].elm.style.left = distribute.l + distribute.w * Math.random() + 'px';
    pieces[i].elm.style.top = distribute.t + distribute.h * Math.random() + 'px';
  }
}