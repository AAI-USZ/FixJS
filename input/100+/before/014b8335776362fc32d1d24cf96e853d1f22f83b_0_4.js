function(inst, screen) {
			if(typeof inst == 'string')  {
				//var inst = this._curInst;
				var target = $(inst);
				inst = this._getInst(target[0]);
				if (this._isDisabledDatepicker(target[0])) {
					return;
				}
			}
			
			var dpuuid = inst.dpuuid;
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var drawYear = inst.drawYear;	//inst.drawYear = inst.selectedYear = inst.currentYear
			var drawMonth = inst.drawMonth;
			var minYear = minDate ? minDate.getFullYear() : 0; //TODO
			var maxYear = maxDate ? maxDate.getFullYear() : undefined;
			var dpHeader = inst.dpDiv.children('.ui-datepicker-header');
			var dpPrev = dpHeader.children('a.ui-datepicker-prev');
			var dpNext = dpHeader.children('a.ui-datepicker-next');
			var dpTitle = dpHeader.children('.ui-datepicker-title');
			
			switch (screen) {
				case 2:
					//month picker
					var self = this;
					var inMinYear = (minYear !== undefined && minYear == drawYear);
					var inMaxYear = (maxYear !== undefined && maxYear == drawYear);
					var _advanceYear_MYP = function(diff) {
						inst.drawYear = drawYear += diff;
						dpTitle.children(':first').text(drawYear);
						//update screen
						if(minDate || maxDate) {
							inMinYear = minYear == drawYear;
							inMaxYear = maxYear == drawYear;
							//update month selection
							var monthPicker = self._generateMonthPickerHTML_MonthYearPicker(inst, minDate, maxDate, drawMonth, inMinYear, inMaxYear);
							inst.dpDiv.children('.ui-datepicker-select-month').html(monthPicker);
						}
						_updatePrevNextYear_MYP();
					}
					var _updatePrevNextYear_MYP = function() {
						dpPrev.unbind('click');
						if(!inMinYear) {
							dpPrev.removeClass('ui-state-disabled').click(function() {_advanceYear_MYP(-1)});
						}
						else {
							dpPrev.addClass('ui-state-disabled');
						}
						dpNext.unbind('click');
						if(!inMaxYear) {
							dpNext.removeClass('ui-state-disabled').click(function() {_advanceYear_MYP(1)});
						}
						else {
							dpNext.addClass('ui-state-disabled');
						}
					}
					//change title link behaviour
					dpTitle.html('<a href="#" onclick="DP_jQuery_' + dpuuid + 
						'.datepicker._toggleDisplay_MonthYearPicker(\'#' + inst.id + '\', 3);return false;">' + drawYear +'</a>');
					//change prev next behaviour
					dpPrev.removeAttr('onclick');  //remove DatePicker's onclick event
					dpNext.removeAttr('onclick');  //remove DatePicker's onclick event
					_updatePrevNextYear_MYP();
					
					$('table.ui-datepicker-calendar').hide();
					$('.ui-datepicker-select-month').show();
					$('.ui-datepicker-select-year').hide();
					break;
				case 3:
					//year picker
					var year = parseInt(drawYear/10, 10) * 10;  //first year in this decade
					//change title link behaviour
					dpTitle.unbind('click');
					//change prev next behaviour
					
					var _generateYearPicker_MYP = function(year) {
						//title text
						dpTitle.text(year + '-' + (year + 9)); //2010 - 2019
						//change prev next behaviour
						dpPrev.unbind('click');
						dpNext.unbind('click');
						if(year > minYear) {
							dpPrev.removeClass('ui-state-disabled').click(function() {_generateYearPicker_MYP(year-21)}); //year is 2021 at this point
						}
						else {
							dpPrev.addClass('ui-state-disabled');
						}
						if(maxYear === undefined || year+9 < maxYear) {
							dpNext.removeClass('ui-state-disabled').click(function() {_generateYearPicker_MYP(year-1)});
						}
						else {
							dpNext.addClass('ui-state-disabled');
						}
						
						//generate year picker HTML
						var yearPicker = '<table><tbody><tr>';
						//show years in 4x3 matrix (2009-2020)
						year--; //last year of the previous decade (2009)
						for (var i = 1; i <= 12; i++) {
							unselectable = (minYear !== 'undefined' && year < minYear) || 
								(maxYear !== 'undefined' && year > maxYear);
							//html += '<span class="year'+(i == -1 || i == 10 ? ' old' : '')+(currentYear == year ? ' active' : '')+'">'+year+'</span>';
							yearPicker += '<td class="' +
								(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable months
								((!unselectable && (i==1 || i==12)) ? ' outoffocus' : '') +
								(year == drawYear ? ' ui-datepicker-today' : '') + '"' +
								(unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + 
									'.datepicker._pickMonthYear_MonthYearPicker(\'#' + inst.id + '\', ' + year + ', \'Y\');return false;"') + '>' + // actions
								((unselectable ? '<span class="ui-state-default">' + year + '</span>' : '<a class="ui-state-default ' +
								//(month == drawMonth ? ' ui-state-highlight' : '') +
								(year == drawYear ? ' ui-state-active' : '') + // highlight selected day
								//(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
								'" href="#">' + year + '</a>')) + '</td>'; // display selectable date
							if(i % 4 == 0) {
								yearPicker += '</tr>';
								if(i != 12) {
									yearPicker += '<tr>';
								}
							}
							year++;
						}
						yearPicker += '</tbody></table>';
						$('.ui-datepicker-select-year').html(yearPicker);
					}

					_generateYearPicker_MYP(year);
					
					$('table.ui-datepicker-calendar').hide();
					$('.ui-datepicker-select-month').hide();
					$('.ui-datepicker-select-year').show();
					
					break;
			}

		}