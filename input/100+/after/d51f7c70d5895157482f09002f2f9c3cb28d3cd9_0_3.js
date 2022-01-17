function(){
  pe.windowWidth = $('#display').width();
  pe.windowHeight = $('#display').height();
  if(pe.windowWidth > pe.windowHeight){
    pe.orientation = 1;
  }else{
    pe.orientation = 0;
  }
  if(pe.orientation == 0){
    $("body").addClass("portrait");
    $("body").removeClass("landscape");
  }else if(pe.orientation == 1){
    $("body").addClass("landscape");
    $("body").removeClass("portrait");
  }
}