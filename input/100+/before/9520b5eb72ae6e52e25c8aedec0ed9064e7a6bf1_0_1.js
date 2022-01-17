function(){
			// style toolbar 1 & 2 drop menu
			sdNav.tb1.add(sdNav.tb2)
				.find('ul ul').addClass('radiusBottom boxShadowDropDown').css('min-width',sdNav.tb1.add(sdNav.tb2).find('ul ul').parent().outerWidth(true))
				.find('ul').removeClass('radiusBottom').addClass('radiusAll')
				.end().find('ul li:first-child > a').addClass('radiusTop')
				.end().find('li:last-child > a').addClass('radiusBottom')
				.end().find('li:only-child > a').removeClass('radiusTop radiusBottom').addClass('radiusAll');

			// set min-width of drop down to width of parent
			sdNav.tb1.find(' ul ul').add(sdNav.tb2.find(' ul ul')).each(function(){
				$(this).css('min-width',$(this).parent().outerWidth(true));
			});

			// style toolbar 2 corners
			sdNav.tb2.find(' > ul > li:first-child > a').addClass('radiusLeft'); 
		}