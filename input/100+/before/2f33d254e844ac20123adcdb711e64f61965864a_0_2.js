function () {
				if (Util.getElementFromCache('#menu_con').hasClass('menu_up')) {
					Util.getElementFromCache('#menu_con').removeClass('menu_up');
					return;
				}
				Util.getElementFromCache('#menu_con').addClass('menu_up');
				Util.getElementFromCache('#menu_con a').removeClass('hlight');
			}