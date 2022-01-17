function (options) {
		this.setOptions(options);
		this.windowopts.title = Joomla.JText._('PLG_VISUALIZATION_CALENDAR_ADD_EDIT_EVENT');
		this.windowopts.y = this.options.popwiny;
		this.popWin = this._makePopUpWin();
		var d = this.options.urlfilters;
		d.visualizationid = this.options.calendarId;
		this.ajax.updateEvents = new Request({url: this.options.url.add,
		'data': d,
		'evalScripts': true,
		'onComplete': function (r) {
			var text = r.stripScripts(true);
			var json = JSON.decode(text);
			this.addEntries(json);
			this.showView();
		}.bind(this)
		});
		
		this.ajax.deleteEvent = new Request({
			url: this.options.url.del,
			'data': {
				'visualizationid': this.options.calendarId
			},
			'onComplete': function (r) {
				r = r.stripScripts(true);
				var json = JSON.decode(r);
				this.entries = $H();
				this.addEntries(json);
			}.bind(this)
		});
	
		if (typeOf(this.el.getElement('.addEventButton')) !== 'null') {
			this.el.getElement('.addEventButton').addEvent('click', this.openAddEvent.bindWithEvent(this));
		}
		var bs = [];
		bs.push(new Element('li', {'class': 'centerOnToday'}).appendText(Joomla.JText._('PLG_VISUALIZATION_CALENDAR_TODAY')));
		if (this.options.show_day) {
			bs.push(new Element('li', {'class': 'dayViewLink'}).appendText(Joomla.JText._('PLG_VISUALIZATION_CALENDAR_DAY')));
		}
		if (this.options.show_week) {
			bs.push(new Element('li', {'class': 'weekViewLink'}).appendText(Joomla.JText._('PLG_VISUALIZATION_CALENDAR_WEEK')));
		}
		if (this.options.show_week || this.options.show_day) {
			bs.push(new Element('li', {'class': 'monthViewLink'}).appendText(Joomla.JText._('PLG_VISUALIZATION_CALENDAR_MONTH')));
		}
		
		var nav = new Element('div', {'class': 'calendarNav'}).adopt( 
		new Element('input', {
			'class': 'previousPage',
			'type': 'button',
			'value': Joomla.JText._('PLG_VISUALIZATION_CALENDAR_PREVIOUS')
		}),
		new Element('input', {
			'class': 'nextPage',
			'type': 'button',
			'value': Joomla.JText._('PLG_VISUALIZATION_CALENDAR_NEXT')
		}),
		new Element('div', {
			'class': 'monthDisplay'
		}),

		new Element('ul', {'class': 'viewMode'}).adopt(bs));
		
		this.el.appendChild(nav);
		//position relative messes up the drag of events
		this.el.appendChild(new Element('div', {'class': 'viewContainer', styles: {'background-color': '#EFEFEF', 'padding': '5px'}}));
		
		if ($type(Cookie.read('fabrik.viz.calendar.date')) !== false) {
			this.date = new Date(Cookie.read('fabrik.viz.calendar.date'));
		}
		var startview = typeOf(Cookie.read("fabrik.viz.calendar.view")) === 'null' ? this.options.viewType : Cookie.read("fabrik.viz.calendar.view");
		switch (startview) {
		case 'dayView':
			this.renderDayView();
			break;
		case 'weekView':
			this.renderWeekView();
			break;
		default:
		case 'monthView':
			this.renderMonthView();
			break;
		}
		
		this.showView();
	
		this.el.getElement('.nextPage').addEvent('click',  this.nextPage.bindWithEvent(this));
		this.el.getElement('.previousPage').addEvent('click',  this.previousPage.bindWithEvent(this));
		if (this.options.show_day) {
			this.el.getElement('.dayViewLink').addEvent('click', this.renderDayView.bindWithEvent(this));
		}
		if (this.options.show_week) {
			this.el.getElement('.weekViewLink').addEvent('click', this.renderWeekView.bindWithEvent(this));
		}
		if (this.options.show_week || this.options.show_day) {
			this.el.getElement('.monthViewLink').addEvent('click', this.renderMonthView.bindWithEvent(this));
		}
		this.el.getElement('.centerOnToday').addEvent('click', this.centerOnToday.bindWithEvent(this));
		this.showMonth();
		
		this.ajax.updateEvents.send();
	}