function () {
		if (this.options.editable) {
			this.watchButtons();
			if (this.options.typing === false) {
				this.disableTyping();
			} else {
				this.getDateField().addEvent('blur', function (e) {
					var date_str = this.getDateField().value;
					if (date_str !== '') {
						var d;
						//this is the calendar native parseDate call, but it doesnt take into account seconds
						// $$$ hugh - yup, but if we don't use parseDate() with the iFormat, a simple Date.parse()
						// hoses up anything but standard 'db' format.  So we HAVE to use parseDate() here.
						if (this.options.advanced) {
							d = Date.parseExact(date_str, Date.normalizeFormat(this.options.calendarSetup.ifFormat));
						}
						else {
							d = Date.parseDate(date_str, this.options.calendarSetup.ifFormat);
						}
						this.setTimeFromField(d);
						this.update(d);
					}
					else {
						this.options.value = '';
					}
				}.bind(this));
			}
			this.makeCalendar();
			//chrome wierdness where we need to delay the hiding if the date picker is hidden
			var h = function () { 
				this.cal.hide();
			};
			h.delay(100, this);
			this.element.getElement('img.calendarbutton').addEvent('click', function (e) {
				if (!this.cal.params.position) {
					this.cal.showAtElement(this.cal.params.button || this.cal.params.displayArea || this.cal.params.inputField, this.cal.params.align);
				} else {
					this.cal.showAt(this.cal.params.position[0], params.position[1]);
				}
				this.cal.show();
			}.bind(this));
			Fabrik.addEvent('fabrik.form.submit.failed', function (form, json) {
				//fired when form failed after AJAX submit
				this.afterAjaxValidation();
			}.bind(this));
		}
	}