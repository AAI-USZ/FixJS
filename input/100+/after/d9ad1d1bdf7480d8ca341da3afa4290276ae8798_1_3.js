function () {
		var i, d, tr, tbody, we;
		this.popWin.setStyle('opacity', 0);
		// For some reason, using '===' does not work, so une '==' instead ! 
		// $$$ rob : Javascript MUST be strongly typed to pass JSLint in our build scripts
		// As show weekends is a boolean I have specically cased it to such in the php code 
		we = this.options.showweekends === false ? 6 : 8;
		this.options.viewType = 'weekView';
		if (!this.weekView) {
			tbody = new Element('tbody');
			tr = new Element('tr');
			for (d = 0; d < we; d++) {
				if (d === 0) {
					tr.adopt(new Element('td', {'class': 'day'}));
				} else {
					tr.adopt(new Element('th', {'class': 'dayHeading',
					'styles': {
						'width': this.options.weekday.width + 'px',
						'height': (this.options.weekday.height - 10) + 'px',
						'text-align': 'center',
						'color': this.options.headingColor,
						'background-color': this.options.colors.headingBg
					},
					'events': {
						'click': function (e) {
							e.stop();
							this.selectedDate.setTime(e.target.className.replace('dayHeading ', '').toInt());
							var tmpdate = new Date();
							e.target.getParent().getParent().getElements('td').each(function (td) {
								var t = td.className.replace('day ', '').replace(' selectedDay').toInt();
								tmpdate.setTime(t);
								if (tmpdate.getDayOfYear() === this.selectedDate.getDayOfYear()) {
									td.addClass('selectedDay');
								} else {
									td.removeClass('selectedDay');
								}
							}.bind(this));
						}.bind(this)
					}
					}).appendText(this.options.days[d - 1]));	
				}
			}
			tbody.appendChild(tr);
			
			this.options.open = this.options.open < 0 ?  0 : this.options.open;
			(this.options.close > 24 || this.options.close < this.options.open) ? this.options.close = 24 : this.options.close;
		
			for (i = this.options.open; i < (this.options.close + 1); i++) {
				tr = new Element('tr');
				for (d = 0; d < we; d++) {
					if (d === 0) {
						var hour = (i.length === 1) ? i + '0:00' : i + ':00';
						tr.adopt(new Element('td', {'class': 'day'}).appendText(hour));
					} else {
						tr.adopt(new Element('td', {'class': 'day',
						'styles': {
							'width': this.options.weekday.width + 'px',
							'height': this.options.weekday.height + 'px',
							'background-color': '#F7F7F7',
							'vertical-align': 'top',
							'padding': 0,
							'border': '1px solid #cccccc'
						},
						'events': {
							'mouseenter': function (e) {
								if (!this.hasClass('selectedDay')) {
									this.setStyles({
										'background-color': '#FFFFDF'	
									});
								}
							},
							'mouseleave': function (e) {
								if (!this.hasClass('selectedDay')) {
									this.setStyles({
										'background-color': '#F7F7F7'	
									});
								}
							},
							'dblclick': function (e) {
								this.openAddEvent(e);
							}.bind(this)	
						}
						}));
					}
				}
				tbody.appendChild(tr);
			}
			this.weekView = new Element('div', {'class': 'weekView',
				'styles': {
					'position': 'relative'
				}
			}).adopt(
					new Element('table', {
						'styles': {'border-collapse': 'collapse'}
					}).adopt(
							tbody
					)
			);
			
			this.el.getElement('.viewContainer').appendChild(this.weekView);
		}
		this.showWeek();
		this.showView('weekView');
	}