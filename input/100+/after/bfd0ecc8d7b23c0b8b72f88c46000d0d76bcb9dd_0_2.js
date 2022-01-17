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
     * Lab menu
     **********/
    $('#lab-nav-list').on('click', 'a', function() {
	var active = $('#lab-nav-list').find('.active');
	active.removeClass('active').addClass('hide');
	active.next().removeClass('hide');

	var current = $(this).find('.hide');
	current.removeClass('hide').addClass('active');
	current.next().addClass('hide');
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
		{'callback': styleCode,},
		{'callback': enableBootstrapEffects,},
	    ]
	}
    );

    $(window).bind('statechange', function() {
	var State = window.History.getState();
	var relativeURL = State.url.replace(window.History.getRootUrl(), '');
	relativeURL = '/' + relativeURL;
	if (State.data['breadcrumb'].length) {
	    $('#breadcrumb').html(State.data['breadcrumb']).show();
	} else {
	    $('#breadcrumb').fadeOut(function(){
		$(this).empty();
	    });
	}

	g_page_reload_ajax.url = relativeURL;
	g_page_reload_ajax.start();
    });

    function getNewBreadcrumb(that) {
	var breadcrumb = $('#breadcrumb').clone();

	if ($(that).data('depth') == 0) {
	    breadcrumb.empty();
	    return breadcrumb;
	}

	breadcrumb.children('li').each(function() {
	    var prev = $(this).prev();
	    if ($(this).children('a').data('depth') >= $(that).data('depth')) {
		$(this).nextAll().remove();
		$(this).remove();
		if (prev.length) {
		    prev.children('span').remove();
		}
	    }
	});

	if (breadcrumb.children('li').last().length) {
	    breadcrumb.children('li').last()
		.append('<span class="divider">/<span/>');
	}

	var new_elem = '<li><a';
	new_elem += ' data-depth="' + $(that).data('depth') + '"';
	new_elem += ' rel="' + $(that).attr('rel') + '"';
	if ($(that).attr('title') !== undefined) {
	    new_elem += ' title="' + $(that).attr('title') + '"';
	}

	new_elem += 'href="' + $(that).attr('href') + '">';
	if ($(that).attr('title') !== undefined) {
	    new_elem += $(that).attr('title');
	} else {
	    new_elem += $(that).html();
	}
	new_elem += '</a>';
	breadcrumb.append(new_elem);

	return breadcrumb;
    }

    function pushState(that) {
	var breadcrumb = getNewBreadcrumb(that);

	options = {'url': window.location.pathname};
	window.History.pushState({'breadcrumb': breadcrumb.html()},
				 $(that).attr('title'),
				 $(that).attr('href'));
    }

    $(document).on('click', 'a[rel=ajax]', function(event){
	pushState(this);
	g_page_reload_ajax.callbacks['success'][0]['disabled'] = false;
	g_page_reload_ajax.callbacks['success'][1]['disabled'] = true;
	return false;
    });

    $(document).on('click', 'a[rel=ajax-content]', function(event){
	pushState(this);
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
    $('.animated-thumbnails > li').hoverdir();

    enableBootstrapEffects();
    styleCode();
    preview();
}