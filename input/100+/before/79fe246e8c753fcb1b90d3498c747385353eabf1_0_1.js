function(){
  
//  handle the animation of the float sidebar
  var menuYloc = parseInt($('#sidebar').css("top"));
  
  $(window).scroll(function(){
	var offset = menuYloc+$(document).scrollTop()+"px";
	var div = $('#sidebar');
	div.animate({top:offset},{duration:500,queue:false});
	
	
	if($(document).scrollTop() == 0){
	  $('#scrollToTop').css('visibility', 'hidden');
	}
	else{
	  $('#scrollToTop').css('visibility', 'visible');
	}
	
  });
  
//  $(window).resize(function() {
//	var offset = menuYloc+$(document).scrollTop()+"px";
//	var div = $('#sidebar');
//	div.animate({top:offset},{duration:500,queue:false});
//  });
  
  
//  hover on the social network img
  $('#social-link a').hover(function() {
	$(this).css('background-position-x', '32px');
  });
  
  $('#social-link a').mouseout(function() {
	$(this).css('background-position-x', '0px');
  });
  
  
  // show and hide the scroll to top tab
  $('#scrollToTop').click(function() {
	$(this).css('visibility', 'hidden');
	$(window).scrollTop();
  });

}