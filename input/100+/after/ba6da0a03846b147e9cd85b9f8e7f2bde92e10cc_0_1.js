function() {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth(),
				startYear = this.startDate !== -Infinity ? this.startDate.getFullYear() : -Infinity,
				startMonth = this.startDate !== -Infinity ? this.startDate.getMonth() : -Infinity,
				endYear = this.endDate !== Infinity ? this.endDate.getFullYear() : Infinity,
				endMonth = this.endDate !== Infinity ? this.endDate.getMonth() : Infinity,
				currentDate = this.date.valueOf();
			this.picker.find('.datepicker-days th:eq(1)')
						.text(dates[this.language].months[month]+' '+year);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = new Date(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth()),
				prevDate, dstDay = 0, date;
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getFullYear() < year || (prevMonth.getFullYear() == year && prevMonth.getMonth() < month)) {
					clsName += ' old';
				} else if (prevMonth.getFullYear() > year || (prevMonth.getFullYear() == year && prevMonth.getMonth() > month)) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate) {
					clsName += ' disabled';
				}
				date = prevMonth.getDate();
				if (dstDay == -1) date++;
				html.push('<td class="day'+clsName+'">'+date+ '</td>');
				if (prevMonth.getDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevDate = prevMonth.getDate();
				prevMonth.setDate(prevMonth.getDate()+1);
				if (prevMonth.getHours() != 0) {
					// Fix for DST bug: if we are no longer at start of day, a DST jump probably happened
					// We either fell back (eg, Jan 1 00:00 -> Jan 1 23:00)
					// or jumped forward   (eg, Jan 1 00:00 -> Jan 2 01:00)
					// Unfortunately, I can think of no way to test this in the unit tests, as it depends
					// on the TZ of the client system.
					if (!dstDay) {
						// We are not currently handling a dst day (next round will deal with it)
						if (prevMonth.getDate() == prevDate)
							// We must compensate for fall-back
							dstDay = -1;
						else
							// We must compensate for a jump-ahead
							dstDay = +1;
					}
					else {
						// The last round was our dst day (hours are still non-zero)
						if (dstDay == -1)
							// For a fall-back, fast-forward to next midnight
							prevMonth.setHours(24);
						else
							// For a jump-ahead, just reset to 0
							prevMonth.setHours(0);
						// Reset minutes, as some TZs may be off by portions of an hour
						prevMonth.setMinutes(0);
						dstDay = 0;
					}
				}
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.getFullYear();

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear == year) {
				months.eq(this.date.getMonth()).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 || i == 10 ? ' old' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		}