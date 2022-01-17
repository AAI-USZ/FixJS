function(idx, ele) { 
			var fmt = project.forms[formName].fields[ele.name].date;
			if(project.forms[formName].fields[ele.name].setDate)
			{
				fmt = project.forms[formName].fields[ele.name].setDate;
			}
			fmt = fmt.replace("MM", "mm").replace("yyyy", "yy");
			
			$(ele).datepicker({ dateFormat : fmt });
			if(project.forms[formName].fields[ele.name].setDate)
			{
				$(ele).datepicker("setDate", new Date());
			}
		}