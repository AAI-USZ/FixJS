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

	_javascript_is_loaded : function(){
	    var proto = Object.getPrototypeOf(this);
	    var selector = proto.widgetBaseClass;
	    var name = proto.widgetName;
	    this._trigger('javacript',selector);
	    if ($(":"+selector).filter(function(index){return $(this)[name]('option','js_loaded');}).length > 0){
		return true;
	    }
	    return false;

	},
	
	_append_javascript : function(){
	    if (!this.options.javascript || this._javascript_is_loaded() )
		return;
	    this.options.js_loaded = true;
	    $.getScript(this.options.javascript);
	},
	
	_get_uri: function(){
	    var url = this.element.parents(".post").find('.entry-title').find("a").attr("href");
	    if (url)
		return url;
	    else
		return document.URL;
	},
	
	switch_button : function(){
	    var el = this.element;
	    var info = $('.info',el);
	    var dummy = $('.dummy_btn',el);

	    if (dummy.hasClass('off')){
		this._trigger('switch-on',el);
		info.addClass('info_off').hide();
		dummy.addClass('on').removeClass('off').html(this._real_btn());
		this._append_javascript();
	    }
	    /* we don't really want to deactivate the buttons... 
	       else {
	       this._trigger('switch-off',el);
	       info.removeClass('info_off');
	       dummy.addClass('off').removeClass('on').html(this._dummy_image())
	       }*/
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
		.attr('data-url',this._get_uri())
		.attr('counturl',this._get_uri())
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
	    'img': '',
	    'javascript' : '',
	    'reply_to': '',
	    'language': '',
	    'result_limit' :100,
	    'count': 0,
	},

	countPost: function(){
	    var self = this;
	    $.get('https://identi.ca/api/search.json?q='+self._get_uri()+'&rpp=100',function(data){
		var num;
		if (data.results.length >= self.options.result_limit)
		    num = self.options.result_limit + '+';
		else
		    num = data.results.length;
		self.option('count',num);
	    });
	},

        _button: function(disabled){
	    var count = this.options.count;
	    var icon = disabled ? 'ui-icon-identica-dummy' : 'ui-icon-identica';
	    return $('<button">identi.ca</button>')
		.button({
		    icons:{
			primary: icon,
		    },
		    text: true,
		    label: 'identi.ca',
		    disabled: false,
		});
	},

	_dummy_image: function(){
	    var self = this;
	    return this._button(true);
	},
	_real_btn: function(){
	    var self = this;
	    this.countPost();
	    var container = $('<div></div>')
	    container.append( this._button(false).click(function(event) {self.share();}));
	    $('<div class="count-o"><div>')
		.append('<i></i><u></u>')
		.append('<a id="count">...</a>')
		.appendTo(container);

	    return container.width(110);
	},

	share: function(){
	    /*Encode the title*/
	    var d=document, e=window.getSelection, k=d.getSelection, x=d.selection, s=(e?e():(k)?k():(x?x.createRange().text:0)), l=d.location, e=encodeURIComponent, pagetitle=((e(s))?e(s):e(d.title));
	    var reply = ''
	    if (this.options.reply_to){
		reply = ' via @' + this.options.reply_to;
	    }
	    var status = 'http://identi.ca/index.php?action=newnotice&status_textarea='+pagetitle+ ' ' + this._get_uri() + reply;
	    window.open(status,'t','toolbar=0, resizable=0, scrollbars=0, status=0, width=785, height=480');
	},

	_setOption: function(key, value){
	    switch(key){
	    case 'count':
		this.element.find('#count')
		    .attr('href', 'https://identi.ca/search/notice?q='+this._get_uri())
		    .html(value)
		break;
	    }
	    $.Widget.prototype._setOption.apply(this,arguments)	
	},

    });

    $.widget('psb.facebookButton',$.psb.baseButton,{
	options : {
	    'name'		: 'facebook',
	    'display_name'	: 'Facebook',
	    'javascript'	: "//connect.facebook.net/en_US/all.js#xfbml=1",
	    'action'	: 'recommend',
	    'js_id'		: 'facebook-jssdk'
	},

	_real_btn: function() {
	    return $('<div class="fb-like" data-send="false" data-layout="button_count" data-width="250" data-show-faces="false" data-action="recommend"></div>');
	},

	_append_javascript : function(){
	    if (!this._javascript_is_loaded()){
		$('body').append('<div id="fb-root"></div>');
		this.options.js_loaded = true;
		$.getScript(this.options.javascript, function(){
		    FB.init();
		    FB.XFBML.parse();
		});
	    } else {
		FB.XFBML.parse();
	    }
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