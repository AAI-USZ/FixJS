function feindura_closeErrorWindow(e) {
  if(e) e.stop();
  if(typeOf($$('.errorWindow')[0]) === 'null')
    return;
  $$('.errorWindow').fade('out');
  $$('.errorWindow').each(function(errorWindow){
    errorWindow.get('tween').chain(function(){
      errorWindow.destroy();
    });
  });
}