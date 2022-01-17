function(event) {
				var curr_date = event.date.getDate();
				var curr_month = event.date.getMonth() + 1;
				var curr_year = event.date.getFullYear();
                if (Calendar.timeUnit == "DAY"){
                    var formatted = curr_year + "-" + curr_month + "-" + curr_date;
                    fetchState("/nav/setDate.json?date=" + formatted);
                }
                else if (Calendar.timeUnit == "WEEK"){
                    var week = getWeekNumber(event.date)[1];
                    fetchState("/nav/setWeek.json?week=" + week + "&year=" + curr_year);
                }
				$(".datepicker").hide();
			}