function () {
			var w = this,
				o = this.options, i,
				cal = false,
				uid = 'ui-datebox-',
				temp = false, row = false, col = false, hRow = false, checked = false;
				
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleDateDialogLabel'));
			w.d.intHTML = $('<span>');
			
			$('<div class="'+uid+'gridheader"><div class="'+uid+'gridlabel"><h4>' +
				w.__('monthsOfYear')[w.theDate.getMonth()] + " " + w.theDate.getFullYear() +
				'</h4></div></div>').appendTo(w.d.intHTML);
				
			// Previous and next month buttons, define booleans to decide if they should do anything
			$("<div class='"+uid+"gridplus"+(w.__('isRTL')?'-rtl':'')+"'><a href='#'>"+w.__('nextMonth')+"</a></div>")
				.prependTo(w.d.intHTML.find('.'+uid+'gridheader'))
				.buttonMarkup({theme: o.themeDate, icon: 'arrow-r', inline: true, iconpos: 'notext', corners:true, shadow:true})
				.on(o.clickEvent, function(e) {
					e.preventDefault();
					if ( w.calNext ) {
						if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
						w._offset('m',1);
					}
				});
			$("<div class='"+uid+"gridminus"+(w.__('isRTL')?'-rtl':'')+"'><a href='#'>"+w.__('prevMonth')+"</a></div>")
				.prependTo(w.d.intHTML.find('.'+uid+'gridheader'))
				.buttonMarkup({theme: o.themeDate, icon: 'arrow-l', inline: true, iconpos: 'notext', corners:true, shadow:true})
				.on(o.clickEvent, function(e) {
					e.preventDefault();
					if ( w.calPrev ) {
						if ( w.theDate.getDate() > 28 ) { w.theDate.setDate(1); }
						w._offset('m',-1);
					}
				});
			
			cal = {'today': -1, 'highlightDay': -1, 'presetDay': -1, 'startDay': w.__('calStartDay'),
				'thisDate': new w._date(), 'maxDate': w.initDate.copy(), 'minDate': w.initDate.copy(),
				'currentMonth': false, 'weekMode': 0, 'weekDays': null };
			cal.start = (w.theDate.copy([0],[0,0,1]).getDay() - w.__('calStartDay') + 7) % 7;
			cal.thisMonth = w.theDate.getMonth();
			cal.wk = w.theDate.copy([0],[0,0,1]).adj(2,(-1*cal.start)+(w.__('calStartDay')===0?1:0)).getWeek(4);
			cal.end = 32 - w.theDate.copy([0],[0,0,32,13]).getDate();
			cal.lastend = 32 - w.theDate.copy([0,-1],[0,0,32,13]).getDate();
			cal.presetDate = w._makeDate(w.d.input.val());
			cal.thisDateArr = cal.thisDate.getArray();
			cal.theDateArr = w.theDate.getArray();
			cal.checkDates = ( $.inArray(false, [o.afterToday, o.beforeToday, o.notToday, o.maxDays, o.minDays, o.blackDates, o.blackDays]) > -1 );

			w.calNext = true;
			w.calPrev = true;
			
			if ( cal.thisDateArr[0] === cal.theDateArr[0] && cal.thisDateArr[1] === cal.theDateArr[1] ) { cal.currentMonth = true; } 
			if ( cal.presetDate.comp() === w.theDate.comp() ) { cal.presetDay = cal.presetDate.getDate(); }
			
			if ( o.afterToday === true && 
				( cal.currentMonth === true || ( cal.thisDateArr[1] >= cal.theDateArr[1] && cal.theDateArr[0] === cal.thisDateArr[0] ) ) ) { 
				w.calPrev = false; }
			if ( o.beforeToday === true &&
				( cal.currentMonth === true || ( cal.thisDateArr[1] <= cal.theDateArr[1] && cal.theDateArr[0] === cal.thisDateArr[0] ) ) ) {
				w.calNext = false; }
			
			if ( o.minDays !== false ) {
				cal.minDate.adj(2, -1*o.minDays);
				if ( cal.theDateArr[0] === cal.minDate.getFullYear() && cal.theDateArr[1] <= cal.minDate.getMonth() ) { w.calPrev = false;}
			}
			if ( o.maxDays !== false ) {
				cal.maxDate.adj(2, o.maxDays);
				if ( cal.theDateArr[0] === cal.maxDate.getFullYear() && cal.theDateArr[1] >= cal.maxDate.getMonth() ) { w.calNext = false;}
			}
			
			temp = $('<div class="'+uid+'grid">').appendTo(w.d.intHTML);
			
			if ( o.calShowDays ) {
				w._cal_days = w.__('daysOfWeekShort').concat(w.__('daysOfWeekShort'));
				cal.weekDays = $("<div>", {'class':uid+'gridrow'}).appendTo(temp);
				if ( w.__('isRTL') === true ) { cal.weekDays.css('direction', 'rtl'); }
				if ( o.calShowWeek ) { 
					$("<div>").addClass(uid+'griddate '+uid+'griddate-empty '+uid+'griddate-label').appendTo(cal.weekDays);
				}
				for ( i=0; i<=6;i++ ) {
					$("<div>"+w._cal_days[(i+cal.startDay)%7]+"</div>").addClass(uid+'griddate '+uid+'griddate-empty '+uid+'griddate-label').appendTo(cal.weekDays);
				}
			}
			
			cal.gen = w._cal_gen(cal.start, cal.lastend, cal.end, !o.calOnlyMonth, w.theDate.getMonth());
			for ( row in cal.gen ) {
				hRow = $('<div>', {'class': uid+'gridrow'});
				if ( w.__('isRTL') ) { hRow.css('direction', 'rtl'); }
				if ( o.calShowWeek ) {
						$('<div>', {'class':uid+'griddate '+uid+'griddate-empty'}).text('W'+cal.wk).appendTo(hRow);
						cal.wk++;
						if ( cal.wk > 52 && typeof cal.gen[parseInt(row,10)+1] !== 'undefined' ) { cal.wk = new Date(cal.theDateArr[0],cal.theDateArr[1],((w.__('calStartDay')===0)?cal.gen[parseInt(row,10)+1][1][0]:cal.gen[parseInt(row,10)+1][0][0])).getWeek(4); }
					} 
				for ( col in cal.gen[row] ) {
					if ( o.calWeekMode ) { cal.weekMode = cal.gen[row][o.calWeekModeDay][0]; }
					if ( typeof cal.gen[row][col] === 'boolean' ) {
						$('<div>', {'class':uid+'griddate '+uid+'griddate-empty'}).appendTo(hRow);
					} else {
						checked = w._cal_check(cal, cal.theDateArr[0], cal.gen[row][col][1], cal.gen[row][col][0]);
						if (cal.gen[row][col][0]) {
							$("<div>"+String(cal.gen[row][col][0])+"</div>")
								.addClass( cal.thisMonth === cal.gen[row][col][1] ?
									(uid+'griddate ui-corner-all ui-btn-up-'+checked.theme + (checked.ok?'':' '+uid+'griddate-disable')):
									(uid+'griddate '+uid+'griddate-empty')
								)
								.jqmData('date', ((o.calWeekMode)?cal.weekMode:cal.gen[row][col][0]))
								.jqmData('theme', cal.thisMonth === cal.gen[row][col][1] ? checked.theme : '-')
								.jqmData('enabled', checked.ok)
								.jqmData('month', cal.gen[row][col][1])
								.appendTo(hRow);
						}
					}
				}
				if ( o.calControlGroup === true ) {
					hRow.find('.ui-corner-all').removeClass('ui-corner-all').eq(0).addClass('ui-corner-left').end().last().addClass('ui-corner-right').addClass('ui-controlgroup-last');
				}
				hRow.appendTo(temp);
			}
			if ( o.calShowWeek ) { temp.find('.'+uid+'griddate').addClass(uid+'griddate-week'); }
			
			if ( o.useTodayButton || o.useClearButton ) {
				hRow = $('<div>', {'class':uid+'controls'});
				
				if ( o.useTodayButton ) {
					$('<a href="#">'+w.__('calTodayButtonLabel')+'</a>')
						.appendTo(hRow).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.theDate = new w._date();
							w.theDate = new w._date(w.theDate.getFullYear(), w.theDate.getMonth(), w.theDate.getDate(),0,0,0,0);
							w.d.input.trigger('datebox',{'method':'doset'});
						});
				}
				if ( o.useClearButton ) {
					$('<a href="#">'+w.__('clearButton')+'</a>')
						.appendTo(hRow).buttonMarkup({theme: o.theme, icon: 'delete', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEvent, function(e) {
							e.preventDefault();
							w.d.input.val('');
							w.d.input.trigger('datebox',{'method':'clear'});
							w.d.input.trigger('datebox',{'method':'close'});
						});
				}
				if ( o.useCollapsedBut ) {
					hRow.addClass('ui-datebox-collapse');
				}
				hRow.appendTo(temp);
			}
			
			w.d.intHTML.on(o.clickEvent+' vmouseover vmouseout', 'div.'+uid+'griddate', function(e) {
				if ( e.type === o.clickEvent ) {
					e.preventDefault();
					if ( $(this).jqmData('enabled') ) {
						w.theDate.set(2,1).set(1,$(this).jqmData('month')).set(2,$(this).jqmData('date'));
						w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(),w.theDate), 'date':w.theDate});
						w.d.input.trigger('datebox', {'method':'close'});
					}
				} else {
					if ( $(this).jqmData('enabled') && typeof $(this).jqmData('theme') !== 'undefined' ) {
						if ( o.calWeekMode !== false && o.calWeekHigh === true ) {
							$(this).parent().find('div').each(function() { w._hoover(this); });
						} else { w._hoover(this); }
					}
				}
			});
			w.d.intHTML
				.on('swipeleft', function() { if ( w.calNext ) { w._offset('m', 1); } })
				.on('swiperight', function() { if ( w.calPrev ) { w._offset('m', -1); } });
			
			if ( w.wheelExists) { // Mousewheel operations, if plugin is loaded
				w.d.intHTML.on('mousewheel', function(e,d) {
					e.preventDefault();
					if ( d > 0 && w.calNext ) { 
						w.theDate.set(2,1);
						w._offset('m', 1);
					}
					if ( d < 0 && w.calPrev ) {
						w.theDate.set(2,1);
						w._offset('m', -1);
					}
				});
			}
		}