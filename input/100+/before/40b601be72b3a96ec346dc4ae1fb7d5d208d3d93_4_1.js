function getToolTip(timestamp){
	
	var output = "";
	var outArray = [];
	
	timestamp = timestamp * 1;
	
	var date = new Date(timestamp);

	//Get the base variables in order	
	var gmtOffset = date.getTimezoneOffset() * 60000;
	var ndate = new Date(date.getTime() - gmtOffset);
	
	var day = ndate.getDay();
	var month = ndate.getMonth();
	var mDay = ndate.getDate();
	
	var showDate = true;
	var showDayInYear = true;
	var showFromToday = true;
	var showFromMarkedDate = true;
	var showSubDates = true;
	
	if(showDate)
	{
		str_showDate = showDateString = getDateString(mDay, month, day);
		outArray.push(str_showDate);
	}
	
	if(showDayInYear)
	{
			//Day of the year
		str_showDayInYear = chrome.i18n.getMessage("dayCapital")+" "+(ndate.getDayOfYear()+1)+" / "+(ndate.getDaysLeftInYear()-1)+" "+chrome.i18n.getMessage("left")+".";
		outArray.push("<div class='popup'>"+str_showDayInYear+"</div>");
	}
	
	if(showFromToday)
	{
		fromToday = ndate.getDaysFromToday()+1;
		var suffix  = "";
		if(Math.abs(fromToday) != 1) suffix = chrome.i18n.getMessage("several_suffix"); //"s" if one

		if(fromToday < 0)
			{
				var countDown = Math.abs(fromToday)+" "+chrome.i18n.getMessage("day", "test")+suffix+" "+chrome.i18n.getMessage("ago")+".";	
				outArray.push("<div class='popup'>"+countDown+"</div>");
			}
			else if(fromToday > 0)
			{
				var countDown = fromToday+" "+chrome.i18n.getMessage("day")+suffix+" "+chrome.i18n.getMessage("leftuntil")+".";
				outArray.push("<div class='popup'>"+countDown+"</div>");
			}
							
		}
			
	if(showFromMarkedDate)
	{
		outArray.push(getCountDownDiffString(ndate));
	}
	
	if(showSubDates)
	{
		var subDates = getSubDates();
		
		for(i=0; i<subDates.length; i++)
		{
			if(timestamp != subDates[i])
			{
			outArray.push("<div class='popup'>"+getSubDateCountdownString(timestamp, subDates[i])+"</div>");
			}
			
		}
	}
	
	outArray = outArray.clean("null");
	
	return outArray.join("");
		
}