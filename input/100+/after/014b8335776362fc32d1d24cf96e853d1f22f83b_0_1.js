function(event) {
			var inst = $.datepicker._getInst(event.target);
			var handled = true;
			//var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing) {
				switch (event.keyCode) {
					case 27:
							if($('.ui-datepicker-select-month').is(':visible')) {
								$.datepicker._updateDatepicker(inst);
							}
							else if($('.ui-datepicker-select-year').is(':visible')) {
								$.datepicker._toggleDisplay_MonthYearPicker(inst, 2, this);
							}
							else {
								$.datepicker._hideDatepicker();
							}
							break; // hide on escape
					//TODO prev/next month/year on month/year picker screens
					default:
							//call the original function
							$.datepicker._doKeyDown_MonthYearPicker(event);
				}
			}
			else {
				//call the original function
				$.datepicker._doKeyDown_MonthYearPicker(event);
			}
		}