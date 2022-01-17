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
  
  
  // project grid
  // set up hover panels
  // although this can be done without JavaScript, we've attached these events
  // because it causes the hover to be triggered when the element is tapped on a touch device
	$('.hover').hover(function(){
		$(this).addClass('flip');
	},function(){
		$(this).removeClass('flip');
	});
	
	var num = $('.panel').length;
	
	
	setInterval(function() {
	  if($.mynamespace.randomNum1 != $.mynamespace.randomNum2){
		$.mynamespace.randomNum1 = Math.floor(Math.random()*num);
		$('.panel').eq($.mynamespace.randomNum1).addClass('flip');
		setTimeout(function() {
		  $('.panel').eq($.mynamespace.randomNum1).removeClass('flip');
		}, 2000);
	  }
	}, 4000);
	  
	setInterval(function() {
	  $.mynamespace.randomNum2 = Math.floor(Math.random()*num);
	  $('.panel').eq($.mynamespace.randomNum2).addClass('flip');
	  setTimeout(function() {
		$('.panel').eq($.mynamespace.randomNum2).removeClass('flip');
		}, 3000)
	  }, 5000); 
	
	
}