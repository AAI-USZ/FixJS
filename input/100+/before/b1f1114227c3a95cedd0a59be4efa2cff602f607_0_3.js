function() {

    /***********
     * Nav bar
     **********/
    var navbar_current = $('#navbar-main-list > li.active').offset();
    var navbar_img = $('<div>');
    navbar_img.attr('id', 'navbar_img');
    if (navbar_current != null)
	navbar_img.offset(navbar_current);
    navbar_img.css('top', '0px');
    $('#navbar').prepend(navbar_img);
    $('#navbar-main-list > li.active').removeClass('active');
    $('#navbar-main-list > li a').click(function() {
	var parent = $(this).parent('li');
	var left = $(parent).offset()['left'];
    	navbar_img.animate({
	    left: left
     	}, {
	    duration: 'slow',
	    easing: 'easeOutBack'
	});
    });

    $(document).on('click', 'a[data-navbar]', function() {
	var target = $(this).data('navbar');
	var left = $(target).offset()['left'];
    	navbar_img.animate({
	    left: left
     	}, {
	    duration: 'slow',
	    easing: 'easeOutBack'
	});
    });

    $('.hide-navbar-img').click(function(){
    	navbar_img.animate({
	    left: '-100px',
     	}, 200);
    });

    /***********
     * Ajax
     **********/
    var g_page_reload_ajax = new Ajaxion(
	'',
	{selector: 'body'},
	'GET',
	[],
	{
	    'success': [
		{
		    'disabled': true,
		    'callback': function(html, status, that) {
			var response = $('<html />').html(html);
			var to_change = ['#local_link', '#body-content',
					 '#app_js'];
			for (var i=0; i<to_change.length; i++) {
			    $(to_change[i]).hide().html(response
							.find(to_change[i])
							.html()).fadeIn();
			}
		    },
		},
		{
		    'disabled': true,
		    'callback': function(html, status, that) {
			var response = $('<html />').html(html);
			var to_change = ['#local_link', '#body-content-only',
					 '#app_js'];
			for (var i=0; i<to_change.length; i++) {
			    $(to_change[i]).hide().html(response
							.find(to_change[i])
							.html()).fadeIn();
			}
		    },
		},
		{
		    'callback': styleCode,
		}
	    ]
	}
    );

    $(window).bind('statechange', function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL
	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    });

    $(document).on('click', 'a[rel=ajax]', function(event){
	options = {'url': window.location.pathname};
	window.History.pushState(null,
				 $(this).attr('title'),
				 $(this).attr('href'));
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = false;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = true;
	return false;
    });

    $(document).on('click', 'a[rel=ajax-content]', function(event){
	options = {'url': window.location.pathname};
	window.History.pushState(null,
				 $(this).attr('title'),
				 $(this).attr('href'));
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = true;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = false;
	return false;
    });

    /***********
     * animateHighlight
     **********/
    $.fn.animateHighlight = function(highlightColor, duration) {
	var highlightBg = highlightColor || "#FFFF9C";
	var animateMs = duration || 1500;
	var originalBg = this.css("backgroundColor");
	this.stop().css("background-color", highlightBg).animate({backgroundColor: originalBg}, animateMs);
    };


    /***********
     * Global
     **********/
    $('.carousel').carousel()
    $('[rel=tooltip]').tooltip();
    $('.animated-thumbnails > li').hoverdir();

    styleCode();
    preview();
}