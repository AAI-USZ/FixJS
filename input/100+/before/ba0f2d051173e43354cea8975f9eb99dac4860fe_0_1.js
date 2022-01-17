function() {
    var navbar_current = $('#navbar-main-list > li.active').offset();
    var navbar_img = $('<div>');
    navbar_img.attr('id', 'navbar_img');
    if (navbar_current != null)
	navbar_img.offset(navbar_current);
    $('#navbar').prepend(navbar_img);
    $('#navbar-main-list > li.active').removeClass('active');
    $('#navbar-main-list > li').click(function(){
	var left = $(this).offset()['left'];
    	navbar_img.animate({
	    left: left,
     	}, 200);
    });

    $('.hide-navbar-img').click(function(){
    	navbar_img.animate({
	    left: '-100px',
     	}, 200);
    });

    $('[rel=tooltip]').tooltip();
    $('.animated-thumbnails > li').hoverdir();

    $.fn.animateHighlight = function(highlightColor, duration) {
	var highlightBg = highlightColor || "#FFFF9C";
	var animateMs = duration || 1500;
	var originalBg = this.css("backgroundColor");
	this.stop().css("background-color", highlightBg).animate({backgroundColor: originalBg}, animateMs);
    };

    styleCode();
}