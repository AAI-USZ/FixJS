function(){
  if(pe.mobile){
    pe.orientation = window.orientation;
  }else{
    pe.windowWidth = $('#display').width();
    pe.windowHeight = $('#display').height();
    if(pe.windowWidth > pe.windowHeight){
      console.log('test');
      pe.orientation = 1;
    }else{
      console.log('test2');
      pe.orientation = 0;
    }
  }
  if(pe.orientation == 0){
    $("body").addClass("portrait");
    $("body").removeClass("landscape");
  }else if(pe.orientation == 1){
    $("body").addClass("landscape");
    $("body").removeClass("portrait");
  }
//  if(pe.debug){pe.orientation = 1;$('body').addClass('landscape');}//debug
}