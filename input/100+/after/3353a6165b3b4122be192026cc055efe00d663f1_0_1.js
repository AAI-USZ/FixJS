function(event) {
				var curr_date = event.date.getDate();
				var curr_month = event.date.getMonth() + 1;
				var curr_year = event.date.getFullYear();
                if (Calendar.timeUnit == "DAY"){
                    var formatted = curr_year + "-" + curr_month + "-" + curr_date;
                    fetchState("/nav/setDate.json?date=" + formatted);
                }
                else if (Calendar.timeUnit == "WEEK"){
                    var weekNumber = getWeekNumber(event.date);
                    fetchState("/nav/setWeek.json?week=" + weekNumber[1] + "&year=" + weekNumber[0]);
                }
				$(".datepicker").hide();
			}