function HiBar(code) {

	var HIBAR_CLOSED_COOKIE_NAME = 'hibar_closed_';

	$.extend(HiBar, $.eventEmitter);

	var self = this;

	//contains option values
	var options =  {};
	//contain behaviours for option values
	var optionBehaviours = [];

	//default options
	options['cookie-life'] = 365;

	//load tempate and css
	$('body').append("<style type='text/css'>" + hibar_css + "</style>");
	$('body').append(hibar_template);

	var bar = $('#hi-bar');
	var opener = $('#hi-bar-open');
	var orginalBodyMargin = $('body').css('margin-top');

	this.init = function init(message, linkText, linkHref, _options) {

		$('#hi-bar-title').html(message);
		var link = $('#hi-bar-link');
		link.html(linkText);
		link.attr('href', linkHref);

		//detect state cookie
		var hibar_closed = $.cookie(HIBAR_CLOSED_COOKIE_NAME + code) == '1';

		if(!hibar_closed) {
			self.show();
		}

		if(_options) {
			//add options if options array exists
			for(var key in _options) {
				options[key] = _options[key];
			}
		}
		applyOptions();

		return self;

	};

	this.show = function show() {

		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() - 1000);
		$.cookie(HIBAR_CLOSED_COOKIE_NAME + code, '1', {expires: expireDate, path: '/'});
		
		opener.slideUp('fast', function() {
			$('body').animate({'margin-top': bar.height() - 10});
			bar.slideDown();
		});

		return self;
	};

	this.close = function close() {

		$('body').animate({'margin-top': orginalBodyMargin});
		bar.slideUp(function() {
			opener.slideDown('fast');
		});

		//add the cookie
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() + 1000 * 60 * 60 * 24 * options['cookie-life']);
		$.cookie(HIBAR_CLOSED_COOKIE_NAME + code, '1', {expires: expireDate, path: '/'});

		return self;
	};

	/*
		Set options for the bar and apply the behavoiur
	*/
	this.set = function set (key, value) {
		
		options[key] = value;
		var behavoiur = optionBehaviours[key];
		if(behavoiur) {
			behavoiur();
		}
	};

	//events
	$('#hi-bar-close', bar).click(function() {

		self.close();
	});

	opener.click(function() {

		self.show();
	});

	/* OPTIONS */

	//apply all the options defined
	function applyOptions() {

		for(var key in options) {

			var behaviour = optionBehaviours[key];
			if(behaviour) {
				behaviour();
			}
		}
	}

	//define option behaviours

	/*
		To change the text appers in the open mini widget
	*/
	optionBehaviours['open-text'] = function() {
		$('#hi-bar-open').text(options['open-text']);
	};

	/*
		Add the cookie life (in days) - used to persist closed state
		no behaviour	
	*/
	optionBehaviours['cookie-life'] = null;

}var hibar_css=" #hi-bar{position:fixed;top:0;left:0;right:0;display:none;z-index:2147483000}#hi-bar-content{background-color:#EB593C;padding:8px 0 8px 0;border-bottom:3px solid #fff;box-shadow:0 0 5px #333;color:#fff;font-size:14px;font-family:Georgia;text-align:center}#hi-bar-link{outline:0;color:#ddd;padding:1px 10px 3px 10px;font-size:12px;box-shadow:0 0 2px #000;border-radius:8px;font-family:Tahoma;margin-left:5px;background:#45484d;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIyNCUiIHN0b3AtY29sb3I9IiM0NTQ4NGQiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);background:-moz-linear-gradient(top, #45484d 24%, #000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(24%, #45484d),color-stop(100%, #000));background:-webkit-linear-gradient(top, #45484d 24%, #000 100%);background:-o-linear-gradient(top, #45484d 24%, #000 100%);background:-ms-linear-gradient(top, #45484d 24%, #000 100%);background:linear-gradient(to bottom, #45484d 24%, #000 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000', GradientType=0 )}#hi-bar-link:hover{box-shadow:0 0 4px #000}#hi-bar-close{position:absolute;right:20px;top:6px;color:#fff;padding:0;font-size:20px;line-height:20px;font-family:arial;font-weight:700;cursor:pointer}#hi-bar-open{position:fixed;top:-5px;right:25px;background-color:#EB593C;padding:15px 6px 5px 6px;color:#fff;font-family:Arial;font-size:12px;font-weight:700;border:3px solid white;border-radius:3px;box-shadow:0 0 10px #ccc;cursor:pointer}