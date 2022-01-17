function(){
    
    var tabId = '#' + $(this).val();
    
    if($(this).attr('checked') === 'checked') {
      $(tabId + '-inactive').hide();
    } else {
      $(tabId + '-inactive').css({
        height : $(tabId).outerHeight(true),
        width : $(tabId).outerWidth(true),
        top : $(tabId).position().top,
        left : $(tabId).position().left
      });
      
      $(tabId + '-inactive').show();
      cofetchHandler.unsetItem($(this).val());
    }
  }