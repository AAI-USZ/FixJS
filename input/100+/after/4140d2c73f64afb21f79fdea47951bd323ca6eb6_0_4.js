function (window, document, z) {
	var $PAGES = z('section.page'), // used in Ui
		$root = z(document),
		TAP = 'tap',
		DBLTAP = 'doubleTap ',
		SKYCABLE_SCHEDULES = {},
		PINNED_SCHEDULES = {},
		doneBuildingChannelList = false,
		pagePosition = {},
		SCHEDULES_DATA_URI = 'http://rafaelgandi.phpfogapp.com/scraper/?url=http://dl.dropbox.com/u/53834631/Skycable%20Scraper/skycable.json'; 
	
	var _CHANNELS = {
		'NATIONAL GEOGRAPHIC':41,
		'AXN':49,
		'BBC':29 ,
		'BIOGRAPHY':65,
		'CNN':28,
		'DISCOVERY CHANNEL':39,
		'DISNEY CHANNEL':47,
		'E!':57,
		'ESPN':31,
		'ETC':14,
		'FOX CHANNEL':50,
		'FOX CRIME':60,
		'FX':156,
		'AUSTRALIA NETWORK':130,
		'HBO':54,
		'HERO TV':44,
		'HISTORY CHANNEL':25,
		'JACK TV':51,
		'KIX':63,
		'LIFESTYLE NETWORK':52,
		'MAX':36,
		'MTV ASIA':71,
		'MYX':23,
		'SOLAR SPORTS':70,
		'STAR MOVIES':55,
		'STAR SPORTS':32,
		'STAR WORLD':48,
		'TLC':120,
		'VELVET':53
	};
	
	var Ui = {
		currentPage: null,
		gotoPage: function (_page, _data) {
			var $page = Util.getElementFromCache(_page);
			$page.data('sent', '');
			if (!!_data) {
				$page.data('sent', JSON.stringify({
					'data': _data
				}));	
			}			
			$PAGES.addClass('hide').removeClass('active_page');	
			$page.removeClass('hide').addClass('active_page');
			Ui.currentPage = $page;	
			$root.trigger(_page.replace(/#/ig, ''), [_data, $page]);
			$root.trigger('afterpagechange', [$page]);
		},
	
		init: function () {
			$root.on(DBLTAP, 'a.page_link', function (e) {
				e.preventDefault();				
				var data = this.getAttribute('data-send'),
					page = '#'+this.href.replace(/^.+#/, '');
				Ui.gotoPage(
					page, 
					(!!data)
						? JSON.parse(data)
						: false
				);
				
			});
			
			$root.on(TAP, 'button[data-href]', function (e) {
				e.preventDefault();
				var page = this.getAttribute('data-href'),
					data =  this.getAttribute('data-send');
				Ui.gotoPage(
					page, 
					(!!data)
						? JSON.parse(data)
						: false
				);							
			});
			
			var hLight = function (_e, _cssClass) {
				var etype = _e.type.toLowerCase(),
					$me = z(_e.Element);
				if (typeof _e.anchor === 'undefined') {
					if (etype === 'touchstart') {
						$me.addClass(_cssClass);
					}
					else if (etype === 'touchmove' || etype === 'touchend') {
						$me.removeClass(_cssClass);
					}	
				}	
				else {
					if (etype === 'touchend') {
						$me.addClass(_cssClass);
						setTimeout(function () {
							$me.removeClass(_cssClass);
						}, 300);
					}
				}		
			};
			
			$root.on('touchstart touchmove touchend', 'a', function (e) {
				hLight(z.extend(e, {'Element': this, 'anchor': true}), 'hlight');
			});
			
			$root.on('touchstart touchmove touchend', 'button', function (e) {			
				hLight(z.extend(e, {'Element': this}), 'button_depress');
			});
		}
	};
	
	
	var Util = {		
		setStoredSkedValue: function (_res) {
			var r, err = false;					
			try { r = JSON.parse(_res); }
			catch (e) { 
				try {
					eval('r='+_res+';');
				}
				catch(lastResort){
					alert('INVALID JSON FOUND ['+lastResort.toString()+']');
					return false;
				}						
			}
			SKYCABLE_SCHEDULES = Util.removeEmptyObjects(r);
			return true;
		},
		
		parseSchedule: function (_callback, _refreshSked) {	
			var refresh = _refreshSked || false;			
			if (refresh || !localStorage.getItem('skycable')) {
				if (navigator.network.connection.type === Connection.NONE) { // check for internet connection first
					alert('Oops, no internet connection.');
					_callback(true);
					return;
				}			
				Ui.gotoPage('#loading_page');
				z.ajax({
					url: SCHEDULES_DATA_URI,
					type: 'get',
					dataType: 'text',
					error: function (xhr, status, error) {
						alert('Sorry and error occurred while doing an ajax call to the skycable website scraper.');
						_callback(true);		
					},
					success: function (res) {						
						if (Util.setStoredSkedValue(res)) {
							localStorage.removeItem('skycable');
							localStorage.removeItem('skycable_pinned');
							localStorage.setItem('skycable', res);
							localStorage.setItem('skycable_pinned', '{}');
							PINNED_SCHEDULES = {};
							Skycable.notify('New set of schedules have been downloaded! :)');
							_callback(false);
						}
						else {	_callback(true); }	
					}
				});				
			}
			else {	
				PINNED_SCHEDULES = JSON.parse(localStorage.getItem('skycable_pinned') || {});
				_callback(!Util.setStoredSkedValue(localStorage.getItem('skycable')));			
			}		
		},
		
		// See: http://stackoverflow.com/a/2673229
		isEmptyObject: function (obj) {
		  for (var prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			  return false;
			}
		  }
		  return true;
		},
		
		today : (function () {
			var today = new Date(),
				d = (today.getDate() < 10) ? ('0'+today.getDate()) : today.getDate(),
				m = (today.getMonth()+1);
			m = (m < 10) ? ('0'+m) : m;				
			return {
				dateBare: today.getDate(),
				date: d,
				month: m,
				year: today.getFullYear(),
				timestamp: Math.floor(today.getTime() / 1000),
				dateFormatted: (m+'/'+d+'/'+today.getFullYear()) // format: MM/DD/YYYY
			};
		})(),
		
		getDayName: (function () {
			var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
				cache = {};
			return function (_date) {
				if (!(_date in cache)) {
					cache[_date] = days[(new Date(_date)).getDay()];
				}
				return cache[_date];
			};
		})(),
		
		removeEmptyObjects: function (_objs) {
			for (var p in _objs) {
				if (_objs.hasOwnProperty(p)) {
					if (Util.isEmptyObject(_objs[p])) {
						delete _objs[p];
					}
				}
			}
			return _objs;
		},
		
		getElementFromCache: (function () {
			var elems = {};
			return function (_selector, _useKey) {
				var selector = (typeof _useKey !== 'undefined') ? _useKey : _selector;		
				if (!elems[_selector]) {
					elems[_selector] = (typeof selector.selector !== 'undefined') ? selector : z(selector);
				}
				return elems[_selector];
			};			
		})(),
		
		confirm: function (_o) {
			if (typeof navigator.notification.confirm !== 'undefined') {
				navigator.notification.confirm(
					_o.message,
					function (button) {
						_o.callback.call(this, button);
					},
					_o.title, _o.buttons
				);
			}
			else { // old fashioned			
				_o.callback.call(this, confirm(_o.message));
			}
		},
		
		findPos: function (obj) {
			// See: http://clifgriffin.com/2008/10/14/using-javascript-to-scroll-to-a-specific-elementobject/
			var curtop = 0;
			if (obj.offsetParent) {
				do {
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			return curtop;
			}
		},
		
		scrollTo: function (_elem) {
			// No really sure why i need a timeout here, but it only scrolls with a timeout.
			setTimeout(function () { 
				self.scrollTo(0, Util.findPos(_elem));
			}, 0);	
		},
		
		sortTime: (function () {
			var cache = {};				
			return function (_arr) {
				var date = Util.today.dateFormatted;
				_arr.sort(function (a, b) {
					var akey = date+' '+a.time,
						bkey = date+' '+b.time;
					if (!(akey in cache)) {
						cache[akey] = (new Date(akey)).getTime();
					}
					if (!(bkey in cache)) {
						cache[bkey] = (new Date(bkey)).getTime();
					}
					var aTime = cache[akey], bTime = cache[bkey];
					aTime = (isNaN(aTime)) ? 0 : aTime;	
					bTime = (isNaN(bTime)) ? 0 : bTime;						
					return (aTime < bTime) 
								? -1
								: (aTime > bTime) ? 1 : 0;
				});
				return _arr;
			};
		})()
	};
	
	window.Skycable = {		
		root: $root,
		
		populateChannelList: function () {
			if (doneBuildingChannelList) {return;}
			doneBuildingChannelList = true;
			var html = '',
				$channelList = Util.getElementFromCache('#channel_list');
			for (var p in _CHANNELS) {
				html += '<li><a href="#date_list_page" data-send=\'{"channel":"'+_CHANNELS[p]+'","name":"'+p+'","from":"channel"}\' class="page_link channel_link">'+p+'</a></li>';
			}
			if ($channelList.length) {
				$channelList.html(html);
			}
			Util.getElementFromCache('#channel_list_page').removeClass('hide');			
		},
		
		populateDateListForChannel: function (_channelName) {			
			if (Util.isEmptyObject(SKYCABLE_SCHEDULES)) { // This part should unlikely to happen because of Skycable.init() checking
				alert('Oops, there are no stored schedules');
				Ui.gotoPage('#channel_list_page');
				return;
			}
			var html = '';				
			for (var p in SKYCABLE_SCHEDULES) {
				if (Util.today.dateFormatted == p) {
					html += '<li class="today"><a href="#sched_list_page" data-send=\'{"channelName":"'+_channelName+'","date":"'+p+'"}\' class="page_link channel_link">'+p+'<small>'+Util.getDayName(p)+'</small></a><img src="assets/images/today.png"></li>';
				}
				else {
					html += '<li><a href="#sched_list_page" data-send=\'{"channelName":"'+_channelName+'","date":"'+p+'"}\' class="page_link channel_link">'+p+'<small>'+Util.getDayName(p)+'</small></a></li>';
				}				
			}
			Util.getElementFromCache('#date_list').html(html).removeClass('hide');			
		},
		
		populateSchedListForChannel: function (_channelName, _date) {
			var html = '',
				schedTemplate = Util.getElementFromCache('#sched_tpl').html(),
				$schedList = Util.getElementFromCache('#sched_list');
			if (!SKYCABLE_SCHEDULES[_date][_channelName]) {
				$schedList.html('');
				navigator.notification.alert(
					'Aw snap, no schedules available for this date',
					function () {},
					'Oop, no sched :(',
					'Ayt'
				);
				Util.getElementFromCache('#sched_list_page').find('button.sched_list_back_button').trigger(TAP);
				return;
			}	
			
			for (var p in SKYCABLE_SCHEDULES[_date]) {
				if (p.toUpperCase() === _channelName.toUpperCase()) {				
					var scheds = SKYCABLE_SCHEDULES[_date][p],
						len = scheds.length;
					for (var i=0; i<len; i++) {
						html += schedTemplate
									.replace('{time}', scheds[i].time)
									.replace('{title}', scheds[i].title)
									.replace('{desc}', scheds[i].desc)
									.replace('{meta}', scheds[i].time+'|'+scheds[i].title+'|'+_channelName+'|'+_date);
					}
					break;
				}
			}
			$schedList.html(html).removeClass('hide');	
		},
		
		exitApp: function () {
			try {
				navigator.app.exitApp();
			}
			catch(e) {
				alert('ERROR: navigator.app.exitApp() - '+e.toString());
				navigator.device.exitApp();
			}
		},
		
		notify: (function () {
			var timer;
			return function (_msg) {
				clearTimeout(timer);
				Util.getElementFromCache('#notification span').html(_msg);
				Util.getElementFromCache('#notification').show().css({opacity:0.9});				
				timer = setTimeout(function () {
					Util.getElementFromCache('#notification').animate({opacity: 0}, {
						duration: 300,
						complete: function () {
							Util.getElementFromCache('#notification span').html('---');
							Util.getElementFromCache('#notification').hide();
						}
					});
				}, 3e3);
			};
		})(),
		
		Pin: {
			refresh: function () { // refresh/update the stored pin data
				localStorage.setItem('skycable_pinned', JSON.stringify(PINNED_SCHEDULES));
			},
			
			add: function (_metaData) {
				var meta = _metaData.split('|'),
					date = new Date();
				if (!(meta[3] in PINNED_SCHEDULES)) {
					PINNED_SCHEDULES[meta[3]] = [];					
				}
				PINNED_SCHEDULES[meta[3]].push({
					'time': meta[0],
					'title': meta[1],
					'channel': meta[2],
					'id': date.getTime()
				});
				PINNED_SCHEDULES[meta[3]] = Util.sortTime(PINNED_SCHEDULES[meta[3]]);
				Skycable.Pin.refresh();				
			},
			
			remove: function (_date, _id) {
				if (typeof PINNED_SCHEDULES[_date] !== 'undefined' && z.isArray(PINNED_SCHEDULES[_date])) {
					var l = PINNED_SCHEDULES[_date].length,
						indx = -1,
						id = _id || false;
					// Check to see if we are going to delete a whole set of programs
					// by date.	
					if (id === false) {
						if (_date in PINNED_SCHEDULES) {
							delete PINNED_SCHEDULES[_date];
							Skycable.Pin.refresh();
							return 2;
						}
					}						
					for (var i=0; i < l; i++) {
						if (parseInt(PINNED_SCHEDULES[_date][i].id, 10) === parseInt(id, 10)) {							
							// Do array deletion here //
							// See: http://wolfram.kriesing.de/blog/index.php/2008/javascript-remove-element-from-array
							// See: http://viralpatel.net/blogs/javascript-array-remove-element-js-array-delete-element/
							indx = PINNED_SCHEDULES[_date].indexOf(PINNED_SCHEDULES[_date][i]);
							if (indx !== -1) {
								PINNED_SCHEDULES[_date].splice(indx, 1);
								Skycable.Pin.refresh();	
								break;
							}						
						}
					}
					// If there are no more programs under this date 
					// then remove this date as well.
					if (PINNED_SCHEDULES[_date].length <= 0) {
						delete PINNED_SCHEDULES[_date];
						Skycable.Pin.refresh();										
						return 2;
					}
					Skycable.Pin.refresh();
					return 1;
				}
			},
			
			populatePinnedDates: function () {
				var html = '';
				if (Util.isEmptyObject(PINNED_SCHEDULES)) {
					Skycable.notify('There are no pinned programs.');	
					Util.getElementFromCache('#pin_list').html('');
					return;
				}
				for (var date in PINNED_SCHEDULES) {					
					html += '<li '+((Util.today.dateFormatted == date) ? 'class="today"' : '')+'><a href="#pin_program_list_page" class="page_link" data-send=\'{"pin_date":"'+date+'"}\'>'+date+'</a></li>';
				}
				if (z.trim(html) === '') {
					Skycable.notify('There are no pinned programs.');	
					return;
				}
				Util.getElementFromCache('#pin_list').html(html);
			},
			
			populatePinnedProgramForDate: function (_date) {
				var html = '',
					tpl = Util.getElementFromCache('#pinned_program_tpl').html();
				if (_date in PINNED_SCHEDULES) {
					z.each(PINNED_SCHEDULES[_date], function () {
						html += tpl.replace('{time}', this.time)
								   .replace('{title}', this.title)
								   .replace('{channel}', this.channel)
								   .replace('{date}', _date)
								   .replace('{id}', this.id);
					});
					Util.getElementFromCache('#pin_program_list').html(html);
				}
			},
			
			initEvents: function () {				
				// Show pins on the menu button //
				z('#show_pins').on(TAP, function (e) {
					e.preventDefault();
					Ui.gotoPage('#pin_list_page');
				});				
				// Adding pins on programs //
				$root.on(DBLTAP, '#sched_list li', function (e) {
					var that = this,
						$me = z(that);
					$me.addClass('hlight');
					Util.confirm({
						message: 'Do you want to pin this program?',
						callback: function (button) {
							if (button === 1 || button === true) {
								Skycable.Pin.add(that.getAttribute('data-meta'));
								Skycable.notify('Pin added!');
							}
							$me.removeClass('hlight');
						},
						title: 'Pin',
						buttons: 'Yep,Nope'
					});					
				});
				// Batch remove pins on programs by date //
				$root.on('longTap', '#pin_list li a', function (e) {
					var date = JSON.parse(this.getAttribute('data-send')).pin_date;				
					Util.confirm({
						message: 'Unpin all programs from this date?',
						callback: function (button) {
							if (button === 1 || button === true) {
								Skycable.Pin.remove(date);
								Ui.gotoPage('#pin_list_page');
								Skycable.notify('Unpinned all programs from date '+date);
							}
						},
						title: 'Unpin all programs from '+date,
						buttons: 'Yep,Nope'
					});
				});
				// Unpin a program //
				$root.on('longTap', '#pin_program_list li', function () {
					var that = this;
					Util.confirm({
						message: 'Unpin this program?',
						callback: function (button) {
							if (button === 1 || button === true) {
								if (Skycable.Pin.remove(that.getAttribute('data-pin-date'), that.getAttribute('data-pin-id')) === 1) {
									Skycable.Pin.populatePinnedProgramForDate(that.getAttribute('data-pin-date'));
								}
								else { Ui.gotoPage('#pin_list_page'); }	
								Skycable.notify('Program unpinned');
							}
						},
						title: 'Unpin',
						buttons: 'Yep,Nope'
					});					
				});
			}
		},
		
		initEvents: function () {			
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
			var goBackHandler = function () {
				var $backButton = (!!Ui.currentPage)
									? Util.getElementFromCache('#'+Ui.currentPage[0].id+' button.back')
									: z('section.active_page').find('button.back');					
				if ($backButton.length) {
					$backButton.trigger(TAP);
				}				
			};
			document.addEventListener('backbutton', goBackHandler, false);
			$root.on('swipeRight', goBackHandler);
			
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
			
		},
		
		init: function () {
			Ui.init();			
			Util.parseSchedule(function (_err) {
				if (!_err) {
					// Run the required events //
					Skycable.initEvents(); 					
					Ui.gotoPage('#channel_list_page');					
				}
				else {
					alert('Oh no! I can\'t seem to get the schedules. Sorry.');
					Skycable.exitApp();
				}	
			});						
		}	
	};
	
}