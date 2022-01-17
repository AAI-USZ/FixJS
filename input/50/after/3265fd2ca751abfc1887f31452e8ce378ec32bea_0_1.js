function(date)
		{
			// Crazy hackery to reset the label time to the correct one.
			// means the Z time format will not give you the correct tz
			var newdate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
			return newdate.format(dateFormat);
		}