function(year) {
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