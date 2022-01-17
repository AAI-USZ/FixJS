function() {
	// Load i18n strings
	var i18n = undefined;
	// TODO: language
	load_i18n_strings();

	// Dust.js i18n helper
	dust.helpers.i18n = function i18n(chunk, context, bodies, params) {
		return chunk.write(_(params.type, params.name));
	};

	// Dust.js base context
	dustbase = dust.makeBase({
		default_calendar_color: default_calendar_color
	});


	// Login page: focus first input field
	if ($('body').hasClass('loginpage')) {
		$('input:submit').button();
		$('input[name="user"]').focus();
	} else if ($('body').hasClass('prefspage')) {
		$('#prefs_tabs').tabs();
		$('#prefs_buttons button').button();
		$('#return_button').on('click', function() {
			window.location = base_app_url;
			return false;
		});
		$('#save_button').on('click', function() {
			var thisform = $('#prefs_form');
			proceed_send_ajax_form(thisform,
				function(data) {
					show_success(
						_('messages', 'info_prefssaved'),
						'');
				},
				function(data) {
					show_error(_('messages', 'error_invalidinput'), data);
				},
				function(data) { });
		});
	} else if ($('body').hasClass('calendarpage')) {
		// Default datepicker options are set inside i18n load strings

		// Default colorpicker options
		set_default_colorpicker_options();
	
		// Enable full calendar
		// TODO: configurable!
		$('#calendar_view').fullCalendar({
			selectable: true,
			editable: true,
			firstDay: prefs_firstday,
			timeFormat: {
				agenda: prefs_timeformat + '{ - ' + prefs_timeformat + '}',
				'': prefs_timeformat
			},
			columnFormat: {
				month: prefs_format_column_month,
				week: prefs_format_column_week,
				day: prefs_format_column_day,
				table: prefs_format_column_table
			},
			titleFormat: {
				month: prefs_format_title_month,
				week: prefs_format_title_week,
				day: prefs_format_title_day,
				table: prefs_format_title_table
			},
			currentTimeIndicator: true,
			weekMode: 'liquid',
			height: calendar_height(),
			windowResize: function(view) {
				$(this).fullCalendar('option', 'height', calendar_height());
			},
			header: {
				left:   'month,agendaWeek,agendaDay table',
				center: 'title',
				right:  'today prev,next'
			},

			listTexts: {
				until: _('labels', 'repeatuntil'),
				past: _('labels', 'pastevents'),
				today: _('labels', 'today'),
				tomorrow: _('labels', 'tomorrow'),
				thisWeek: _('labels', 'thisweek'),
				nextWeek: _('labels', 'nextweek'),
				thisMonth: _('labels', 'thismonth'),
				nextMonth: _('labels', 'nextmonth'),
				future: _('labels', 'future'),
				week: 'W'
			},
			// list/table options
			listSections: 'smart',
			listRange: 30,
			listPage: 7,

			monthNames: month_names_long(),
			monthNamesShort: month_names_short(),
			dayNames: day_names_long(),
			dayNamesShort: day_names_short(),
			buttonText: {
				today: _('labels', 'today'),
				month: _('labels', 'month'),
				week: _('labels', 'week'),
				day: _('labels', 'day'),
				table: _('labels', 'tableview')
			},
			theme: true, // use jQuery UI themeing
			allDayText: _('labels', 'allday'),
			axisFormat: prefs_timeformat,
			slotMinutes: 30,
			firstHour: 8,

			allDayDefault: false,

			loading: function(bool) {
				if (bool) {
					// Now loading
					$('#calendar_view').mask(_('messages', 'overlay_synchronizing'), 500);
				} else {
					// Finished loading
					$('#calendar_view').unmask();
				}
			},

			eventRender: event_render_callback,
			eventClick: event_click_callback,

			// Add new event by dragging. Click also triggers this event,
			// if you define dayClick and select there is some kind of
			// collision between them.
			select: slots_drag_callback,
			
			// Useful for creating events in agenda view
			selectHelper: select_helper,

			eventResize: event_resize_callback,
			eventDrop: event_drop_callback
		});


		// Refresh link
		$('<span class="fc-button-refresh">' 
			+_('labels', 'refresh') + '</span>')
			.appendTo('#calendar_view td.fc-header-right')
			.button()
			.on('click', function() {
				update_calendar_list(true);
			})
			.before('<span class="fc-header-space">');

		// Date picker above calendar
		$('#calendar_view span.fc-button-today')
			.after('<span class="fc-button-datepicker">'
				+'<img src="' + base_url + '/img/datepicker.gif" alt="' 
				+ _('labels', 'choose_date') +'" />'
				+'</span>')
			.after('<input type="hidden" id="datepicker_fullcalendar" />')
			.after('<span class="fc-header-space" />')
			.nextUntil('#datepicker_fullcalendar')
			.next()
			.datepicker({
				changeYear: true,
				closeText: _('labels', 'cancel'),
				onSelect: function(date, text) {
					var d = $('#datepicker_fullcalendar').datepicker('getDate');	
					$('#calendar_view').fullCalendar('gotoDate', d);
				}
			})
			.end()
			.nextUntil('span.fc-button-datepicker')
			.next()
			.on('click', function() {
				$('#datepicker_fullcalendar').datepicker('setDate', $('#calendar_view').fullCalendar('getDate'));
				$('#datepicker_fullcalendar').datepicker('show');
			});
		

		$('#calendar_view').fullCalendar('renderEvent', 
			{
				title: 'Little portal',
				start: '1985-02-15T00:00:00Z',
				end: '1985-02-15T23:59:59Z',
				allDay: true,
				editable: false,
				color: '#E78AEF'
			},
			true);


		/*************************************************************
		 * Calendar list events
		 *************************************************************/

		// Editing a calendar
		$('div.calendar_list').on('click', 'img.cfg', function(e) {
			e.stopPropagation();
			var calentry = $(this).parent();
			calendar_modify_form(calentry[0]);
		})
		.on('click', 'li.available_calendar', function(e) {
			// Make calendar transparent
			toggle_calendar($(this));
		});

		// First time load: create calendar list
		update_calendar_list(true);

		$('#sidebar').on('click', '#toggle_all_shared_calendars', function(e) {
			var shared_cals = $('#shared_calendar_list').find('ul').children();
			if ($(this).hasClass('hide_all')) {
				$.map(shared_cals, function(e, i) {
					hide_calendar($(e));
				});
				$(this)
					.removeClass('hide_all')
					.addClass('show_all')
					.attr('src', base_url + 'img/color_swatch.png');
			} else {
				$.map(shared_cals, function(e, i) {
					show_calendar($(e));
				});
				$(this)
					.removeClass('show_all')
					.addClass('hide_all')
					.attr('src', base_url + 'img/color_swatch_empty.png');
			}
		});


		// Create calendar
		$('#calendar_add')
			.on('click', calendar_create_form);

		/*************************************************************
		 * End of calendar list events
		 *************************************************************/

		/*************************************************************
		 * Shortcuts
		 *************************************************************/

		$('#shortcut_add_event')
			.button({
				icons: {
					primary: 'ui-icon-plusthick'
				}
			})
			.on('click', function() {
				var start = fulldatetimestring($('#calendar_view').fullCalendar('getDate'));
				var data = {
						start: start,
						allday: false,
						view: 'month'
				};

				// Unselect every single day/slot
				$('#calendar_view').fullCalendar('unselect');
				event_field_form('new', data);
			});
		}

		// User menu
		$('#usermenu').qtip({
			content: $('#usermenu_content'),
			position: { my: 'top center', at: 'bottom center' },
			style: {
				tip: true,
				classes: 'ui-tooltip-bootstrap agendav-menu'
			},
			show: {
				event: 'click',
				delay: 0
			},
			hide: {
				event: 'unfocus'
			}
		});
}