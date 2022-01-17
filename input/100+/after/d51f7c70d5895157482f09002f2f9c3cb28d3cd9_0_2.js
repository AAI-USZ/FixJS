function(e){
  var id = $(e).attr('id');
  $(e).addClass('selected');
  if(pe.orientation == 0){
    var bgPositionLeft = -320 + pe.menuOffsetArray[id] - pe.footerScrollLeft;
    $('#slider').css('backgroundPosition', bgPositionLeft + 'px 0');
  }else if(pe.orientation == 1){
    if(pe.webapp){
      var webappOffset = 20;
    }else{
      var webappOffset = 0;
    }
    var sliderPositionTop = -25 +  webappOffset + pe.menuLandscapeOffsetArray[id] - pe.footerScrollTop;
    $('#slider').css('top', sliderPositionTop + 'px');
  }
  $('#slider').attr('class',id);
  $('#slider').fadeIn(300);
}