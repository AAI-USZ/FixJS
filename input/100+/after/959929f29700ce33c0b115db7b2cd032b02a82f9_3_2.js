function CCMenu(_caller, _options){
	var menu = this;
	var caller = $(_caller);
    $(caller).wrap('<div />');
	var content = $(caller).parent().hide();
    var options = jQuery.extend({
		content: content.html(),
		width: 220, // width of menu container, must be set or passed in to calculate widths of child menus
		maxHeight: 400, // max height of menu (if a drilldown: height does not include breadcrumb)
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
		nextMenuLink: 'ui-icon-triangle-1-e', // class to style the link (specifically, a span within the link) used in the multi-level menu to show the next level
		topLinkText: 'Home',
		nextCrumbLink: 'ui-icon-carat-1-e',
        containingElement :".menuContainer"
	}, _options);
	this.showLoading = function(){
		caller.addClass(options.loadingState);
	};
    var container = $('<div class="kyt_menuContainer ui-widget ui-widget-content ui-corner-all">'+options.content+'</div>');
    $(caller).hide();

    this.getLocationString = function(){
        var result="";
        $(".fg-menu-breadcrumb li").each(function(i,item){
            if(i>0){
                result += $(item).text().trim()+"/";
            }
        });
        return result.length>0 ? result.substring(0,result.length-1):"";
    };

    this.setMenuByUrl = function(url){
        var item = container.find('.fg-menu').find("a[href='"+url+"']");
        if($(item).size()==0)return;
        var result="";
        function getToken(item){
            var parent = $(item).parents('ul:eq(0)');
            if(!parent || $(parent).hasClass("ccMenu")) return;
            result += parent.siblings("a").children("span").text().trim()+"/";
            getToken(parent);
        }
        getToken(item);
        // if result is empty then the item is on the root menu.  still need to hightlite item (callerOnState)
        if(!result){
            menu.resetDrilldownMenu();
        }else{
            result = result.substring(0,result.length-1).split("/").reverse().join("/");
            menu.goToItem(result);
        }
        $(item).addClass(options.callerOnState);
    };

    this.goToItem = function(displayText){
        // this is the same as resetDrilldownMenu() except that I don't think that's
        // inscope at this time cuz it fucks it up
        $('.fg-menu-current').removeClass('fg-menu-current');
		container.find('.fg-menu').find('ul').each(function(){
            $(this).hide();
            $(this).removeClass('fg-menu-scroll').removeClass('fg-menu-current').height('auto');
        });

        $('.fg-menu-all-lists').find('span').remove();
		$(".fg-menu-breadcrumb").empty().append( $('<li class="fg-menu-breadcrumb-text">'+options.crumbDefaultText+'</li>') );
        	
        
        
        var tokens = displayText.split("/");
        var parentUl = container.find('.fg-menu');
        $(tokens).each(function(x,xy){
            $(parentUl).children('li').children('a').each(function(i, item) {
                if ($(item).text() == xy) {
                    $(item).trigger('click',true);
                    $(parentUl).removeClass(options.callerOnState);
                     parentUl = $(this).next('ul');
                }
            })
        });
    };

    this.showMenu = function(){
		if (!menu.menuExists) {
            menu.create();
//            var urlToken = $.address.value();
//            if(urlToken){
//                menu.setMenuByUrl(urlToken);
//            }
        }
		menu.menuOpen = true;
		// assign key events
		$(document).keydown(function(event){
			var e;
			if (event.which !="") { e = event.which; }
			else if (event.charCode != "") { e = event.charCode; }
			else if (event.keyCode != "") { e = event.keyCode; }

			var menuType = ($(event.target).parents('div').is('.fg-menu-flyout')) ? 'flyout' : 'ipod' ;

			/*switch(e) {
				case 37: // left arrow
					if (menuType == 'flyout') {
						$(event.target).trigger('mouseout');
						if ($('.'+options.flyOutOnState).size() > 0) { $('.'+options.flyOutOnState).trigger('mouseover'); }
					}

					if (menuType == 'ipod') {
						$(event.target).trigger('mouseout');
						if ($('.fg-menu-footer').find('a').size() > 0) { $('.fg-menu-footer').find('a').trigger('click'); }
						if ($('.fg-menu-header').find('a').size() > 0) { $('.fg-menu-current-crumb').prev().find('a').trigger('click'); }
						if ($('.fg-menu-current').prev().is('.fg-menu-indicator')) {
							$('.fg-menu-current').prev().trigger('mouseover');
                        }
					}
					return false;
					break;

				case 38: // up arrow
					if ($(event.target).is('.' + options.linkHover)) {
						var prevLink = $(event.target).parent().prev().find('a:eq(0)');
						if (prevLink.size() > 0) {
							$(event.target).trigger('mouseout');
							prevLink.trigger('mouseover');
						}
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
							setTimeout(function(){
								$(event.target).next().find('a:eq(0)').trigger('mouseover');
							}, options.crossSpeed);
						}
					}
					return false;
					break;

				case 40: // down arrow
					if ($(event.target).is('.' + options.linkHover)) {
						var nextLink = $(event.target).parent().next().find('a:eq(0)');
						if (nextLink.size() > 0) {
							$(event.target).trigger('mouseout');
							nextLink.trigger('mouseover');
						}
					}
					else { container.find('a:eq(0)').trigger('mouseover'); }
					return false;
					break;

				case 13: // enter
					if ($(event.target).is('.fg-menu-indicator') && menuType == 'ipod') {
						$(event.target).trigger('click');
						setTimeout(function(){
							$(event.target).next().find('a:eq(0)').trigger('mouseover');
						}, options.crossSpeed);
					}
					break;
			}*/
		});
	};

	this.create = function(){	
		container.css({ width: options.width }).appendTo(options.containingElement).find('ul:first').not('.fg-menu-breadcrumb').addClass('fg-menu');
		container.find('ul, li a').addClass('ui-corner-all');

		// aria roles & attributes
		container.find('ul').attr('role', 'menu').eq(0).attr('aria-activedescendant','active-menuitem').attr('aria-labelledby', caller.attr('id'));
		container.find('li').attr('role', 'menuitem');
		container.find('li:has(ul)').attr('aria-haspopup', 'true').find('ul').attr('aria-expanded', 'false');
		container.find('a').attr('tabindex', '-1');
		
		// when there are multiple levels of hierarchy, create flyout or drilldown menu
		if (container.find('ul').size() > 1) {
			menu.drilldown(container, options);
		}
		else {
			container.find('a').click(function(){
				menu.chooseItem(this);
				return false;
			});
		}
		
		if (options.linkHover) {
			var allLinks = container.find('.fg-menu li a');
			allLinks.hover(
				function(){
					var menuitem = $(this);
					$('.'+options.linkHover).removeClass(options.linkHover).blur().parent().removeAttr('id');
					$(this).addClass(options.linkHover).focus().parent().attr('id','active-menuitem');
				},
				function(){
					$(this).removeClass(options.linkHover).blur().parent().removeAttr('id');
				}
			);
		}
		
		if (options.linkHoverSecondary) {
			container.find('.fg-menu li').hover(
				function(){
					$(this).siblings('li').removeClass(options.linkHoverSecondary);
					if (options.flyOutOnState) { $(this).siblings('li').find('a').removeClass(options.flyOutOnState); }
					$(this).addClass(options.linkHoverSecondary);
				},
				function(){ $(this).removeClass(options.linkHoverSecondary); }
			);
		}
		
		menu.setPosition(container, caller, options);
	};
	
	this.chooseItem = function(item){
		// edit this for your own custom function/callback:
        $('.fg-menu li a',container).removeClass(options.callerOnState);
        $(item).addClass(options.callerOnState);

        KYT.vent.trigger("menuItem", $(item).attr('rel'));
        return false;
	};
}