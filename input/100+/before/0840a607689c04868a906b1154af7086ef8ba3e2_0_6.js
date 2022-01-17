function($) {

$.widget('psb.baseButton', {
	// default options
	options : {
		'name'		: '',
		'display_name' : '',		
		'txt_info'	: 'Click here to enable the button',
		'dummy_img'	: '',
		'javascript': '',
		'js_loaded'	: false
	},
	
	_create: function(){
		var self = this;
		$('<span class="info">' + this.options.txt_info + '</span>')
		.hide()
		.addClass('dropdown')
		.appendTo(this.element);
		$('<div class="dummy_btn off"></div>')
		.append(this._dummy_image())
		.appendTo(this.element);
		
		this.element.click( function(event) {self.switch_button();});

		this.element.hover(
			function(){
				var info = $('.info',self.element);
				if(!info.hasClass('info_off'))
					info.show();
			},
			function() {
				$('.info',self.element).hide();
			});
	},
	
	_dummy_image : function(){
		return $('<img/>', {
			src : this.options.dummy_img,
			alt : this.options.display_name + ' Dummy Image',
			"class" : 'dummy_img'
			});
	},
	
	_append_javascript : function(){
		var self = this;

		if (!this.options.javascript)
			return;
		
		var name = Object.getPrototypeOf(this).widgetBaseClass;
		this._trigger('javacript',name);
		if ($(":"+name).filter(function(index){return self.options.js_loaded;}).length > 0)
			return;
			
		this.options.js_loaded = true;
		var js = document.createElement("script");
		js.type = "text/javascript";
		js.src = this.options.javascript;
		js.async = true;
		$(document.body).append(js);
	},
	
	_get_uri: function(){
		return $(this).parents(".post").find('.entry-title').find("a").attr("href");
	},
	
	switch_button : function(){
		var el = this.element;
		var info = $('.info',el);
		var dummy = $('.dummy_btn',el);

		if (dummy.hasClass('off')){
			this._trigger('switch-on',el);
			this._append_javascript();
			info.addClass('info_off').hide();
			dummy.addClass('on').removeClass('off').html(this._real_btn());
		} else {
			this._trigger('switch-off',el);
			info.removeClass('info_off');
			dummy.addClass('off').removeClass('on').html(this.options.dummy_image)
		}
	}
});

$.widget('psb.twitterButton',$.psb.baseButton,{
	options : {
		'name' : 'twitter',
		'display_name' : 'Twitter',
		'javascript' : '//platform.twitter.com/widgets.js',
		'reply_to': '',
		'language': '',
	},
	
	_real_btn: function() {
		return $('<a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>')
			.attr('data-url',this._get_uri)
			.attr('counturl',this._get_uri)
			.attr('data-via',this.options.reply_to)
			.attr('data-lang', this.options.language)
			.attr('data-related', this.options.reply_to)
			.attr('data-dnt',true);
	},
	
});

$.widget('psb.identicaButton',$.psb.baseButton,{
	options : {
		'name' : 'identica',
		'display_name' : 'Identi.ca',
		'javascript' : '',
		'reply_to': '',
		'language': '',
	},

	_real_btn: function(){
		
	},

});

$.widget('psb.facebookButton',$.psb.baseButton,{
	options : {
		'name'			: 'facebook',
		'display_name'	: 'Facebook',
		'javascript'	: '//connect.facebook.net/en_US/all.js',
		'action'		: 'recommend',
		'js_id'			: 'facebook-jssdk'
	},

	_real_btn: function() {
		return $('<div class="fb-like" data-send="false" data-layout="button_count" data-width="250" data-show-faces="false" data-action="recommend"></div>');
	},
	
	_append_javascript : function(){
		var self = this;
	
		if (!this.options.javascript)
			return;
	
		var name = Object.getPrototypeOf(this).widgetBaseClass;
		this._trigger('javacript',name);
		if ($(":"+name).filter(function(index){return self.options.js_loaded;}).length > 0)
			return;
	
		this.options.js_loaded = true;
		var fbroot = $('<div id="fb-root"></div>').prependTo($(document.body));	
		var js = document.createElement("script");
		js.type = "text/javascript";
		js.src = this.options.javascript;
		js.async = true;
		js.id = this.options.js_id;
		fbroot.append(js);
	},

});

$.widget('psb.gplusButton',$.psb.baseButton,{
	options : {
		'name' : 'gplus',
		'display_name' : 'Google+',
		'javascript' : '//apis.google.com/js/plusone.js',
	},

	_real_btn: function() {
		return $('<div class="g-plusone" data-size="medium"></div>');
	}

});

$.widget('psb.socialShareButtons',{
	options: {
		'info_link'			: 'https://github.com/controesempio/Privacy-Share-Buttons',
		'txt_help'			: 'When you activate these buttons by clicking on them, some of your personal data will be transferred to third parties and can be stored by them. More informationf <em> <a href="https://github.com/controesempio/Privacy-Share-Buttons"> here </a></em>.',
		'perma'				: 'on',
		'settings_perma'	: 'Permanently enable data transfer for:',
		'css_path'			: '',
		'cookie_options'	: {
				'path'			: '/',
				'expires'		: 365
		},
		'services' : {},
	},
	
	_create: function() {
		if (!this.options.services)
			return;
		this._append_css();
		this._attach();
		
	},
	
	_attach: function() {
		
		var context = $('<ul class="social_share_privacy_area" style="font-size: 0.6em"></ul>').appendTo(this.element);

		// social buttons
		for (var name in this.options.services){
			if (!$.psb[name+'Button'])
				continue;
			var li = $('<li class="'+name +'"><li');
			li[name+'Button']($.extend(this.options, this.options.services[name]))
			.appendTo(context);
		}
		
		// options and info
		var container = $('<li></li>');
		container.prependTo(context);
		// info button
		this._info_area(container);
		// and finally it's time for the settings area (i.e. permanent activation)
		this._options_area(container);
		container.buttonset();
	},
	
	_options_submenu: function(container){
			var self = this;
			// let's add a sub-option for each service
			// which has perma-option on
			var option_submenu = $("<div id='option-dropdown'></div>")
			.addClass('dropdown')
			.html(this.options.settings_perma+'<br/>');
	
			var update = function(event){
				var click = event.target.id;
				var service = click.substr(click.lastIndexOf('_') + 1, click.length);
				var cookie_name = 'privacyShareButtons_' + service;
				var checkbox = option_submenu.find('#' + event.target.id);
	
				if (checkbox.is(':checked')) {
					$.cookie(cookie_name,'perma_on',self.options.cookie_options);
					option_submenu.find('label[for=' + click + ']').addClass('checked');
				} else {
					$.cookie(cookie_name,null,self.options.cookie_options);
					option_submenu.find('label[for=' + click + ']').removeClass('checked');
				}
			};
	
			for (var name in this.options.services){
				var serv = this.options.services[name];
	
				var checkbox =	$("<input type='checkbox' />")
					.attr('id', 'perma_status_'+name)
					.click( update );
					
				// let's get the cookie and check if we have to activate the button	
				if ($.cookie('privacyShareButtons_'+name) == 'perma_on'){
					checkbox.attr('checked',true);
					// we need to activate the button!
					this.element.find('.'+name).click();
				}
				checkbox.appendTo(option_submenu);
				$("<label></label><br/>")
					.attr('for', "perma_status_"+name)
					.html(serv.display_name)
					.appendTo(option_submenu);
			}
			option_submenu.hide().appendTo(container.parent());
	},
	
	_options_area: function(container){
			if (this.options.perma){
				// the option button
				$("<button>option</button>")
				.button({
					icons:{
						primary:'ui-icon-wrench',
						secondary: "ui-icon-triangle-1-s"
					},
					text:false
				})
				.click(function(){
					container.parent().find('#option-dropdown').toggle(100);
				})
				.appendTo(container);
			this._options_submenu(container);
			}
	},
	
	_info_area : function(container){
			// now it's time for the info area
			var info_dialog = $("<div></div>")
				.addClass('psb_info')
				.addClass('dropdown')
				.html("<p>"+this.options.txt_help+"</p>")
				.hide()
				.mouseleave( function() {$(this).hide();})
				.appendTo(container.parent());

			$("<button>info</button>").button({ 
				icons:{primary:'ui-icon-info'},
				text:false 
				})
				.click(
					function(){ info_dialog.toggle();})
				.appendTo(container);
		},
	
	// adds CSS to head if we have to do so
	_append_css : function(){
		// insert stylesheet into document and prepend target element
		if (this.options.css_path) {
			// IE fix (needed for IE < 9 - but this is done for all IE versions)
			if (document.createStyleSheet) {
				document.createStyleSheet(options.css_path);
			} else {
				console.log('166');
				$('head').append('<link rel="stylesheet" type="text/css" href="' + options.css_path + '" />');
			}
		}
	},
	
});

$(document).ready(
	$(".social_share_privacy").each(function(){
		$(this).socialShareButtons(socialshareprivacy_settings);
	}))
}