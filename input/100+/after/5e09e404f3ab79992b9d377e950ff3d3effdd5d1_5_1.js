function () {
		var dateEl = document.id('timelineDatePicker');
		if (typeOf(dateEl) === 'null') {
			return;
		}
		var params = {'eventName': 'click',
				'ifFormat': this.options.dateFormat,
				'daFormat': this.options.dateFormat,
				'singleClick': true,
				'align': "Br",
				'range': [1900, 2999],
				'showsTime': false,
				'timeFormat': '24',
				'electric': true,
				'step': 2,
				'cache': false,
				'showOthers': false,
				'advanced': false };
		var dateFmt = this.options.dateFormat;
		params.date = Date.parseDate(dateEl.value || dateEl.innerHTML, dateFmt);
		params.onClose = function (cal) {
			cal.hide();
		};
		params.onSelect = function () {
			if (this.cal.dateClicked) {
				this.cal.callCloseHandler();
				dateEl.value = this.cal.date.format(dateFmt);
				this.tl.getBand(0).setCenterVisibleDate(this.cal.date);
			}
		}.bind(this);
		
		params.inputField = dateEl;
		params.button = document.id('timelineDatePicker_cal_img');
		params.align = "Tl";
		params.singleClick = true;
		
		this.cal = new Calendar(0,
				params.date,
				params.onSelect,
				params.onClose);
		
		this.cal.showsOtherMonths = params.showOthers;
		this.cal.yearStep = params.step;
		this.cal.setRange(params.range[0], params.range[1]);
		this.cal.params = params;
		
		this.cal.setDateFormat(dateFmt);
		this.cal.create();
		this.cal.refresh();
		this.cal.hide();
		
		if (typeOf(params.button) !== 'null') {
			params.button.addEvent('click', function (e) {
				this.cal.showAtElement(params.button);
				this.cal.show();
			}.bind(this));
		}
		dateEl.addEvent('blur', function (e) {
			this.updateFromField();
		}.bind(this));
		
		dateEl.addEvent('keyup', function (e) {
			if (e.key === 'enter') {
				this.updateFromField();
			}
		}.bind(this));
	
	}