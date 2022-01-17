function() {
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
				mw.log(" call menu.flyout "); 
				menu.flyout(container, options); 
			} else {
				mw.log(" call menu.drilldown "); 
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
	}