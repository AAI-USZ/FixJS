function(idx, item) {
			        var $subMenu = $(this).find('.sn-up-submenu');
			        $subMenu.hide();
			        if ($subMenu.size() == 0) { return; }

			        $(this).children('a').css('padding-right','1.7em').append('<span class="ui-menu-icon ui-icon ui-icon-secondary ui-icon-carat-1-s" style=""></span>');

			        $subMenu.addClass('ui-menu ui-widget ui-widget-content ui-menu-icons ui-corner-bottom ui-corner-' + ($.sn.rtl ? 'tr' : 'tl')).attr('role', 'menu');
			        // $subMenu.addClass('ui-menu ui-widget ui-widget-content
			        // ui-menu-icons ui-corner-bottom
			        // ui-corner-all').attr('role', 'menu');
			        $subMenu.children('li:not( .ui-menu-item ):has( a )').addClass('ui-menu-item').attr('role', 'menu-item');
			        $subMenu.children('li.ui-menu-item:has( a )').find('a').addClass('ui-corner-all').hover(function() {
				        $(this).toggleClass('ui-state-focus')
			        });

			        $(this).children('a').bind('click', function() {
				        if ($(this).attr('aria-expanded')) {
					        upMenu.close(this, $subMenu);
				        } else {
					        upMenu.open(this, $subMenu);
				        }
			        })

		        }