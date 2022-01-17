function(start_date, num_workdays) {
		num_days = num_workdays;
		if ( start_date.getDay() + num_workdays < 6)
		{
			// don't need to add any weekends
		}	
		else
		{
			// add the weekends
			num_days = num_days +  2 * Math.floor(num_days / 5);
			if ( num_workdays % 5 + start_date.getDay() > 5)
			{
				num_days += 2;
			}
		}
		return start_date.addDays(num_days);
	}