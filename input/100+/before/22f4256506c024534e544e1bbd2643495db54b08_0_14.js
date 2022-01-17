function(value)
	{
		var msgs = []
		if(this.required && (!value || value == "")) msgs.push("This field is required");
		if(value && value != "")
	    {
			if(this.isinteger){
				if(!value.match(/^[0-9]+$/))
				{
					msgs.push("This field must be an Integer");
				}
			}
			if(this.isdouble){
				if(!value.match(/^[0-9]+(\.[0-9]+)?$/))
				{
					msgs.push("This field must be an decimal");
				}
			}
			
			if(this.date || this.setDate){
				// will consist of dd MM and yyyy
				var fmt = this.date + this.setDate; 
				var sep = null;
				
				var day = null;
				var month = null
				var year = null;
				
				for(var i = 0; i < fmt.length; i ++)
				{
					if(fmt[i] == "d")
					{
						if(fmt[i+1] == "d")
						{
							day = Number(value.substr(i,2));
							if(day == NaN) msgs.push("Day is not a number");
							i++
						}
						else
						{
							throw "Invalid date format";
						}
					}
					else if(fmt[i] == "M")
					{
						if(fmt[i+1] == "M")
						{
							month = Number(value.substr(i,2));
							if(month == NaN) msgs.push("Month is not a number");
							i++
						}
						else
						{
							throw "Invalid date format";
						}
					}
					else if(fmt[i] == "y")
					{
						if(fmt[i+1] == "y" && fmt[i+2] == "y" && fmt[i+3] == "y" )
						{
							year = Number(value.substr(i,4));
							if(year == NaN) msgs.push("Year is not a number");
							i+=3
						}
						else
						{
							throw "Invalid date format";
						}
					}
					else
					{
						if(!sep) sep = fmt[i];
					}
					
					if(day)
					{
						if(day < 1 || day > 31)	msgs.push("Day is out of range");
						else if(month && (month == 4 || month == 6 || month == 9 || month == 11) && day > 30) msgs.push("Day is out of range");
						else if(month && month == 2 && day > 29 && (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))) msgs.push("Day is out of range");
						else if(month && month == 2 && day > 28) msgs.push("Day is out of range");
					}
					if(month)
					{
						if(month < 1 ||  month > 12) msgs.push("Month is out of range");
					}
					
				}
			}
			
			if(this.time || this.setTime){
				var fmt = this.date + this.setDate; 
				var sep = null;
				
				var hours = null;
				var minutes = null
				var seconds = null;
				
				for(var i = 0; i < fmt.length; i ++)
				{
					if(fmt[i] == "H")
					{
						if(fmt[i+1] == "H")
						{
							hours = Number(value.substr(i, 2));
							if(hours == NaN) msgs.push("Hours are not a number");
							if(hours < 0 || hours > 23) msgs.push("Hours out of range");
							i++;
							
						}
						else
							throw "Time Format is invalid";
							
					}
					else if(fmt[i] == "m")
					{
						if(fmt[i+1] == "m")
						{
							minutes == Number(value.substr(i,2));
							if(minutes == NaN) msgs.push("Minutes are not a number");
							if(minutes < 0 || minutes > 59) msgs.push("Minutes out of range");
							i++
						}
					}
					else if(fmt[i] == "s")
					{
						if(fmt[i+1] == "s")
						{
							seconds == Number(value.substr(i,2));
							if(seconds == NaN) msgs.push("Seconds are not a number");
							if(seconds < 0 || seconds > 59) msgs.push("Seconds out of range");
							i++
						}
					}
				}
			}
			
			if(this.regex){
				if(!value.match(new RegExp(this.regex))) msgs.push(this.regexMessage ? this.regexMessage : "The value you have entered is not in the right format.");
			}
			
			if(this.max){
				if(Number(value) > this.max) msgs.push("Value must be less than  or equal to" + this.max);
			}
			
			if(this.min){
				if(Number(value) < this.min) msgs.push("Value must be greater than or equal to " + this.min);
			}
			
			if(this.match){
				//in this version the match field must be present on the page and filled in
				info = this.match.split(",");
				
				matchStr = $("#" + info[1]).val().match(new RegExp(info[2]));
				valStr = value.match(new RegExp(info[2]));
				
				if(valStr != matchStr) msgs.push("The value does not match the string from the parent field");
			}
			
			if(this.verify)
			{
				if(!$("#" + this.id).hasClass("ecplus-valid"))
				{
					$("#" + this.id).hide();
					if(prompt("Please re-enter the value for " + this.text + " to confirm the value") != value)
					{
						msgs.push("field values must match");
						$("#" + this.id).val("");
					}
					$("#" + this.id).show();
				}
				
			}
	    }
		
		if(msgs.length == 0)
		{
			$("#" + this.id).removeClass("ecplus-invalid");
			$("#" + this.id).addClass("ecplus-valid");
		}
		else
		{
			$("#" + this.id).removeClass("ecplus-valid");
			$("#" + this.id).addClass("ecplus-invalid");
		}	
		
		return msgs.length == 0 ? true : msgs;		
	}