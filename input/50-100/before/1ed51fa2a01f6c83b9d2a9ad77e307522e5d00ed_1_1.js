function feindura_closeErrorWindow(e) {
  if(e) e.stop();
  $('feindura_errorWindow').fade('out');
    $('feindura_errorWindow').get('tween').chain(function(){
    $('feindura_errorWindow').destroy();
  });
}