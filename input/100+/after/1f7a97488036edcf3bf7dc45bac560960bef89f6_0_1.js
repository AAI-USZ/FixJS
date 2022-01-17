function($){

	/* Frehmwerk
	================================================== */
	$.frehmwerk();

	var theme_default_Functions = (function(){
		/* Variables
		================================================== */
		var jq = $([]),
		div_EC3 = jq.add('div#myExtraContent3'),
		div_EC4 = jq.add('div#myExtraContent4'),
		div_EC5 = jq.add('div#myExtraContent5'),
		div_middle = jq.add('div.middle').not('div.upper,div.lower'),
		div_wide_left = jq.add('div.wide.left'),
		div_wide_right = jq.add('div.wide.right'),
		div_narrow = jq.add('div.narrow'),
		div_bottom = jq.add('div.bottom').not('div.upper'),
		div_footer = jq.add('div#footer'),
		nav_breadcrumb = jq.add('nav#breadcrumb'),
		div_blog_entry = jq.add('div.blog-entry'),
		div_plugin_sidebar = jq.add('div#plugin_sidebar');
		group_plugin_sidebar = div_plugin_sidebar.find('div#blog-categories, div#blog-archives, ul.blog-tag-cloud, div#blog-rss-feeds'),
		div_filesharing_item = jq.add('div.filesharing-item'),
		is_bottom = 0;

		/* FUNCTIONS
		================================================== */

		/* SS3
		================================================== */
		$.SeydoggySlideshow({
			wrapper : '.header',
			bgPosition : 'center center',
		});


		/* Top Functions
		================================================== */
		var top_fn = (function(){
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
		})();
		/* Middle Functions
		================================================== */
		var middle_fn = (function(){

			// style top round corners on main content if EC3 is not present
			if (!div_EC3.length) {
				div_middle.addClass('radiusTop');
				div_wide_left.addClass('radiusTopLeft');
				div_wide_right.addClass('radiusTopRight');
			} else {
				// remove top margin if EC3 is present
				div_middle.css('margin-top','0');
			}

			// show div.bottom if div#footer or nav#breadcrumb is propogated
			if (div_footer.html() || nav_breadcrumb.html()) div_bottom.css('display','block'), is_bottom = true;
			if (!div_footer.html() || !nav_breadcrumb.html()) {
				div_footer.add(nav_breadcrumb).css({
					'float':'none',
					'margin':'0 auto',
					'text-align':'center',
					'width':'auto'
				});
			}

			// style bottom round corners on main content if EC4, EC5 and div.bottom are not present
			if (is_bottom == 0) {
				if (!div_EC4.length && !div_EC5.length) {
					if (div_middle.hasClass('radiusTop')) div_middle.removeClass('radiusTop').addClass('radiusAll').css('margin-bottom','3.5em');
					else div_middle.addClass('radiusBottom').css('margin-bottom','3.5em');
					if (div_wide_left.hasClass('radiusTopLeft')) div_wide_left.removeClass('radiusTopLeft').addClass('radiusLeft');
					else div_wide_left.addClass('radiusBottomLeft');
					if (div_wide_right.hasClass('radiusTopRight')) div_wide_right.removeClass('radiusTopRight').addClass('radiusRight');
					else div_wide_right.addClass('radiusBottomRight');
				} else if (!div_EC4.length || !div_EC5.length) {
					div_EC4.add(div_EC5).parent().addClass('radiusBottom').css('margin-bottom','3.5em');
				}else if (div_EC4.length && div_EC5.length) {
					div_EC5.parent().addClass('radiusBottom').css('margin-bottom','3.5em');
				}
			}

			// style toolbar 3
			if (sdNav.tb3.find('ul li').length <= 1) sdNav.tb3.find('a').addClass('radiusAll');
			else sdNav.tb3.find('ul').find('li a').first().addClass('radiusTop')
					.end().end().find('li a').filter(':visible').last().addClass('radiusBottom');
			if (sdNav.tb3.find(' > ul li > ul')) {
				//Add 'hasChildren' class to tb3 ul li's
				sdNav.tb3.find(' > ul li > ul').parent().addClass('hasChildren');
				sdNav.tb3.find('li.hasChildren > a').append(' &nbsp; <i class="icon-caret-down"/>');
			}

			// style toolbar 3 (responsive)
			if ($('nav#toolbar3').length) {
				var nav_toolbar3 = jq.add('nav#toolbar3');
				nav_toolbar3.addClass('radiusAll');
				if (nav_toolbar3.find('ul li').length <= 1) nav_toolbar3.find('a').addClass('radiusAll');
				else nav_toolbar3.find('ul').find('li a').first().removeClass('radiusLeft radiusRight').addClass('radiusTop')
						.end().end().find('li a').filter(':visible').last().removeClass('radiusLeft radiusRight').addClass('radiusBottom');
			}
			
			// when blog page
			if (div_blog_entry.length) {
				// add entry icons with font-awesome
				div_blog_entry
					.find('h1.blog-entry-title a').prepend('<i class="icon-pencil"/> &nbsp;')
					.end().find('div.blog-entry-date').prepend('<i class="icon-calendar"/> &nbsp;');
				// add sidebar icons with font-awesome
				group_plugin_sidebar.prepend('<div class="before"><i/></div>');
				div_plugin_sidebar
					.find('div#blog-categories div.before')
						.find('i').addClass('icon-folder-close')
						.end().append('&nbsp; Categories:')
					.end().find('div#blog-archives div.before')
						.find('i').addClass('icon-calendar')
						.end().append('&nbsp; Archives:')
					.end().find('ul.blog-tag-cloud div.before')
						.find('i').addClass('icon-tags')
						.end().append('&nbsp; Tags:')
					.end().find('div#blog-rss-feeds div.before')
						.find('i').addClass('icon-book')
						.end().append('&nbsp; Feeds:');
			};
			
			// when file sharing page
			if (div_filesharing_item.length) {
				// add file sharing icons with font-awesome
				div_filesharing_item.find('div.filesharing-item-title a').prepend('<i class="icon-download-alt"/> &nbsp;');
			};
			
		})();
	})();
	var i;
	for (i in document.images) {
		if (document.images[i].src) {
			var imgSrc = document.images[i].src;
			if (imgSrc.substr(imgSrc.length-4) === '.png' || imgSrc.substr(imgSrc.length-4) === '.PNG') {
				document.images[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + imgSrc + "')";
			}
		}
	}
}