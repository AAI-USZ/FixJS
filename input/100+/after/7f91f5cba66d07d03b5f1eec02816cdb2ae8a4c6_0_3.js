function Menu(caller, options) {
	var menu = this;
	var caller = $(caller);
	
	mw.log( 'jquery.Menu:: target container: ' + options.targetMenuContainer );
	 
	var callerClassList = 'fg-menu-container ui-widget ui-widget-content ui-corner-all'; 
	if( options.targetMenuContainer ) {		
		var container = $( options.targetMenuContainer )
			.addClass( callerClassList )
			.html( options.content )	
	}else{
		var container = $('<div>').addClass( callerClassList ).html( options.content );
	}	

	
	this.menuOpen = false;
	this.menuExists = false;
	
	var options = jQuery.extend( {
		content: null,
		autoShow: false,
		width: 180, // width of menu container, must be set or passed in to calculate widths of child menus
		maxHeight: 180, // max height of menu (if a drilldown: height does not include breadcrumb)
		targetMenuContainer: null,
		zindex: 2,
		positionOpts: {
			posX: 'left', 
			posY: 'bottom',
			offsetX: 0,
			offsetY: 0,
			directionH: 'right',
			directionV: 'down', 
			detectH: true, // do horizontal collision detection  
			detectV: true, // do vertical collision detection
			linkToFront: false
		},
		showSpeed: 200, // show/hide speed in milliseconds
		createMenuCallback: null,
		closeMenuCallback: null,
		callerOnState: 'ui-state-active', // class to change the appearance of the link/button when the menu is showing
		loadingState: 'ui-state-loading', // class added to the link/button while the menu is created
		linkHover: 'ui-state-hover', // class for menu option hover state
		linkHoverSecondary: 'li-hover', // alternate class, may be used for multi-level menus		
	// ----- multi-level menu defaults -----
		crossSpeed: 200, // cross-fade speed for multi-level menus
		crumbDefaultText: 'Choose an option:',
		backLink: true, // in the ipod-style menu: instead of breadcrumbs, show only a 'back' link
		backLinkText: 'Back',
		flyOut: false, // multi-level menus are ipod-style by default; this parameter overrides to make a flyout instead
		flyOutOnState: 'ui-state-default',
		// class to style the link (specifically, a span within the link) used in the multi-level menu to show the next level
		nextMenuLink: 'ui-icon-triangle-1-e',
		topLinkText: 'All',
		nextCrumbLink: 'ui-icon-carat-1-e'	
	}, options);
	
	
	// Apply some custom css to container
	container.css( { 
		'left' : '0px', 
		'z-index': options.zindex
	} );
	
	var killAllMenus = function() {
		$.each(allUIMenus, function(i) {
			if (allUIMenus[i].menuOpen) { allUIMenus[i].kill(); };	
		});
	};
	
	this.kill = function() {		
		caller
			.removeClass(options.loadingState)
			.removeClass('fg-menu-open')
			.removeClass(options.callerOnState);	
		container.find('li').removeClass(options.linkHoverSecondary).find('a').removeClass(options.linkHover);		
		if (options.flyOutOnState) { container.find('li a').removeClass(options.flyOutOnState); };	
		if (options.callerOnState) { 	caller.removeClass(options.callerOnState); };			
		if (container.is('.fg-menu-ipod')) { menu.resetDrilldownMenu(); };
		if (container.is('.fg-menu-flyout')) { menu.resetFlyoutMenu(); };
		if( ! options.keepPosition ){
			container.parent().hide();	
		} else {
			container.hide();
		}
		menu.menuOpen = false;
		if( typeof options.closeMenuCallback == 'function'){
			options.closeMenuCallback();
		}
		
		$(document).unbind('click', killAllMenus);
		$(document).unbind('keydown');
	};
	
	this.showLoading = function() {
		caller.addClass(options.loadingState);
	};

	this.showMenu = function() {
		mw.log( 'jquery.menu:: show menu' );
		killAllMenus();
		// always create the menu to ensure it has correct layout
		menu.create() 
		mw.log( 'jquery.menu:: menu.create' );		
		caller
			.addClass('fg-menu-open')
			.addClass(options.callerOnState);
		container.parent().show().click(function() {
			menu.kill(); 
			return false; 
		});
		mw.log('jquery.menu:: menu. binding container' );
		
		container.hide().slideDown(options.showSpeed).find('.fg-menu:eq(0)');
		menu.menuOpen = true;
		caller.removeClass(options.loadingState);
		$(document).click(killAllMenus);
		
		// assign key events
		$(document).keydown(function(event) {
			var e;
			if (event.which !="") { e = event.which; }
			else if (event.charCode != "") { e = event.charCode; }
			else if (event.keyCode != "") { e = event.keyCode; }
			
			var menuType = ($(event.target).parents('div').is('.fg-menu-flyout')) ? 'flyout' : 'ipod' ;
			
			switch(e) {
				case 37: // left arrow 
					if (menuType == 'flyout') {
						$(event.target).trigger('mouseout');
						if ($('.'+options.flyOutOnState).size() > 0) { $('.'+options.flyOutOnState).trigger('mouseover'); };
					};
					
					if (menuType == 'ipod') {
						$(event.target).trigger('mouseout');
						if ($('.fg-menu-footer').find('a').size() > 0) { $('.fg-menu-footer').find('a').trigger('click'); };
						if ($('.fg-menu-header').find('a').size() > 0) { $('.fg-menu-current-crumb').prev().find('a').trigger('click'); };
						if ($('.fg-menu-current').prev().is('.fg-menu-indicator')) {
							$('.fg-menu-current').prev().trigger('mouseover');							
						};						
					};
					return false;
					break;
					
				case 38: // up arrow 
					if ($(event.target).is('.' + options.linkHover)) {	
						var prevLink = $(event.target).parent().prev().find('a:eq(0)');						
						if (prevLink.size() > 0) {
							$(event.target).trigger('mouseout');
							prevLink.trigger('mouseover');
						};						
					}
					else { container.find('a:eq(0)').trigger('mouseover'); }
					return false;
					break;
					
				case 39: // right arrow 
					if ($(event.target).is('.fg-menu-indicator')) {						
						if (menuType == 'flyout') {
							$(event.target).next().find('a:eq(0)').trigger('mouseover');
						}
						else if (menuType == 'ipod') {
							$(event.target).trigger('click');						
							setTimeout(function() {
								$(event.target).next().find('a:eq(0)').trigger('mouseover');
							}, options.crossSpeed);
						};				
					}; 
					return false;
					break;
					
				case 40: // down arrow 
					if ($(event.target).is('.' + options.linkHover)) {
						var nextLink = $(event.target).parent().next().find('a:eq(0)');						
						if (nextLink.size() > 0) {							
							$(event.target).trigger('mouseout');
							nextLink.trigger('mouseover');
						};				
					}
					else { container.find('a:eq(0)').trigger('mouseover'); }		
					return false;						
					break;
					
				case 27: // escape
					killAllMenus();
					break;
					
				case 13: // enter
					if ($(event.target).is('.fg-menu-indicator') && menuType == 'ipod') {							
						$(event.target).trigger('click');						
						setTimeout(function() {
							$(event.target).next().find('a:eq(0)').trigger('mouseover');
						}, options.crossSpeed);					
					}; 
					break;
			};			
		});	
	};
	
	this.create = function() {
		mw.log( "jquery.menu.create ");	
		
		container.css({ 
			'width' : options.width 
		})
		.find( 'ul:first' )
		.not( '.fg-menu-breadcrumb' )
		.addClass('fg-menu');
		
		if(!options.keepPosition){
			container.appendTo('body')
		}
			
		
		container.find('ul, li a').addClass('ui-corner-all');
		
		// aria roles & attributes
		container.find( 'ul' ).attr('role', 'menu').eq(0).attr('aria-activedescendant','active-menuitem').attr('aria-labelledby', caller.attr('id'));
		container.find( 'li' ).attr('role', 'menuitem');
		container.find( 'li:has(ul)' ).attr('aria-haspopup', 'true').find('ul').attr('aria-expanded', 'false');
		container.find( 'a' ).attr('tabindex', '-1');
		
		// when there are multiple levels of hierarchy, create flyout or drilldown menu
		if ( container.find( 'ul' ).size() > 1 ) {
			if ( options.flyOut ) {
				mw.log("jquery.menu:: call menu.flyout "); 
				menu.flyout(container, options); 
			} else {
				mw.log("jquery.menu:: call menu.drilldown "); 
				menu.drilldown(container, options); 
			}	
		} else {
			container.find( 'a' ).click( function() {									 
				menu.chooseItem( this );
				return false;
			} );
		};	
		
		if (options.linkHover) {
			var allLinks = container.find('.fg-menu li a');
			allLinks.hover(
				function() {
					var menuitem = $(this);
					var menuli = menuitem.parent();
					if( !menuli.hasClass('divider') && !menuli.hasClass('disabled')  ){
						$('.'+options.linkHover).removeClass(options.linkHover).blur().parent().removeAttr('id');
						$(this).addClass(options.linkHover).focus().parent().addClass('active-menuitem');
					}
				},
				function() {
					if( typeof menuitem != 'undefined' && !menuitem.hasClass('divider') && !menuitem.hasClass('disabled')  ){
						$(this).removeClass(options.linkHover).blur().parent().removeClass('active-menuitem');
					}
				}
			);
		};
		
		if (options.linkHoverSecondary) {
			container.find('.fg-menu li').hover(
				function() {
					$(this).siblings('li').removeClass(options.linkHoverSecondary);
					if (options.flyOutOnState) { $(this).siblings('li').find('a').removeClass(options.flyOutOnState); }
					$(this).addClass(options.linkHoverSecondary);
				},
				function() { $(this).removeClass(options.linkHoverSecondary); }
			);
		};					
		if( !options.keepPosition ){
			menu.setPosition(container, caller, options);
		}
		menu.menuExists = true;
				
		if( typeof options.createMenuCallback == 'function' ){
			options.createMenuCallback();
		}
	};
	
	this.chooseItem = function(item) {		
		menu.kill();				
		if( options.selectItemCallback )
			options.selectItemCallback( item );			
	};
}