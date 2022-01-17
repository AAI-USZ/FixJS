function()
  { 
    var state = $(this).next(".msg_content").css('display');
    if( state == 'none' ) {
	$(this).css('background-image','url("' + baseUrl() +  '/images/div_opened.gif")');
    } else {
        $(this).css('background-image','url("' + baseUrl() +  '/images/div_closed.gif")');	
    }
    $(this).next(".msg_content").slideToggle(600,function(){
	$.cookies.set(location.pathname + '/'+$(".msg_content").index(this), $(this).css('display'));
    });
  }