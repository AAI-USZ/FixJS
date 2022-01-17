function () {			
			// Set the scroll offset position to 0 default value
			$PAGES.each(function () { pagePosition[this.id] = 0; });
		
			////////  PAGE EVENTS /////////			
			$root.on('afterpagechange', function (e, _$page) {
				var scrollOffset = pagePosition[_$page[0].id];
				if (typeof scrollOffset !== 'undefined') {
					window.scrollTo(0, scrollOffset);
				}				
			});			
			$root.on('channel_list_page', function () {
				Skycable.populateChannelList();
			});
			$root.on('date_list_page', function (e, _data) {
				Util.getElementFromCache('#date_list_page h1').text(_data.name);	
				Skycable.populateDateListForChannel(_data.name);			
				// Set the "data-send" attr of the sched list back button for
				// it to know which channel to go back to. (A sort of breadcrumb)	
				Util.getElementFromCache('button.sched_list_back_button').attr('data-send', JSON.stringify({
					'channel': _data.channel,
					'name': _data.name
				}));				
				// When date list page is called from channel list page, scroll to date today. //
				if (typeof _data.from !== 'undefined') {
					if (Util.getElementFromCache('#date_list').find('li.today').length) {								
						Util.scrollTo(Util.getElementFromCache('#date_list').find('li.today')[0]);	
					}	
				}
			});		
			$root.on('sched_list_page', function (e, _data) {
				Util.getElementFromCache('#sched_list_page h1').html(_data.channelName+'<br> <small>('+_data.date+')</small>');
				Skycable.populateSchedListForChannel(_data.channelName, _data.date);						
			});
			
			$root.on('pin_list_page', function (e, _data) {
				Skycable.Pin.populatePinnedDates();
			});
			
			$root.on('pin_program_list_page', function (e, _data) {
				Util.getElementFromCache('#pin_program_list_page h1').html(_data.pin_date);
				Skycable.Pin.populatePinnedProgramForDate(_data.pin_date);
			});
			
			// Remember the previous positions of each page //
			$root.on('touchstart', 'ul.listview a', function (e) {
				pagePosition[Ui.currentPage[0].id] = window.scrollY;				
			});
			
			// Exit Button //
			z('button.exit, a.exit').on(TAP, function (e) {
				e.preventDefault();
				Skycable.exitApp();
			});
			
			z('#menu_cannellist_link').on(TAP, function (e) {
				// Delay for the scrollTo function to work //
				setTimeout(function () {
					window.scrollTo(0,0);
				}, 0);
				Ui.gotoPage('#channel_list_page');
			});
			
			// Back buttons //
			var goBackHandler = function (e) {
				var $backButton = (!!Ui.currentPage)
									? Util.getElementFromCache('#'+Ui.currentPage[0].id+' button.back')
									: z('section.active_page').find('button.back');					
				if ($backButton.length) {
					$backButton.trigger(TAP);
				}
			};
			document.addEventListener('backbutton', goBackHandler, false);			
			// See: http://eightmedia.github.com/hammer.js/
			new Hammer(document.body, { // Swipe right
				drag_vertical: false,
				drag_min_distance: 110
			})
			.ondragstart = function (e) {				
				if (e.direction === 'right' && Math.ceil(Math.abs(e.angle)) < 38) {
					goBackHandler(e);
				}
			};
			
			// Menu button //
			document.addEventListener('menubutton', function () {
				if (Util.getElementFromCache('#menu_con').hasClass('menu_up')) {
					Util.getElementFromCache('#menu_con').removeClass('menu_up');
					return;
				}
				Util.getElementFromCache('#menu_con').addClass('menu_up');
				Util.getElementFromCache('#menu_con a').removeClass('hlight');
			}, false);
			
			// On Menu Blur //
			$root.on('touchstart', (function () {
				var timer;
				return function () {
					clearTimeout(timer);
					timer = setTimeout(function () {
						Util.getElementFromCache('#menu_con').removeClass('menu_up');
					}, 300);					
				};
			})());
			
			z('#sked_refresh').on(TAP, function (e) {
				e.preventDefault();
				if (navigator.network.connection.type === Connection.NONE) { // if no internet connection
					alert('Can\'t get new schedules cause their is no internet access');
					return;
				}
				var _doRefreshing = function () {
					Ui.gotoPage('#loading_page');
					Util.parseSchedule(function (_err) {
						if (_err) {			
							alert('An error occured when getting schedules. Unable to refresh schedules');
						}
						Ui.gotoPage('#channel_list_page');						
					}, true);		
				};				
				Util.confirm({
					message: 'Do you really want to refresh the schedules?',
					callback: function (button) {
						if (button === 1 || button === true) {
							_doRefreshing();																						
						}
					},
					title: 'Refresh Schedules',
					buttons: 'Yep,Nope'
				});										
			});
			
			$root.on('focus', 'a, button', function () {
				z(this).blur();
			});			
			
			// initialize pins events //
			Skycable.Pin.initEvents();
			
		}