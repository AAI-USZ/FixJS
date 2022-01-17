function(day)
	{
		// Title
		let isToday = false;
		let isTomorrow = false;
		let strTitle = "";
		let today = new Date();
		let tomorrow = new Date(today.getTime() + 86400000);
		let title;
		if (this.sameDay(day,today))
		{
			strTitle = _("Today");
			isToday = true;
		}
		else if (this.sameDay(day,tomorrow))
		{
			strTitle = _("Tomorrow")
			isTomorrow = true;
		}
		else
		{
			dateFormat = _("%A, %B %d");
        		strTitle = day.toLocaleFormat(dateFormat);
        	}
        	title = new PopupMenu.PopupMenuItem(strTitle, {reactive: false});
        	title.actor.set_style("padding-top : 10px");
        	// Check preferences
        	if (prefs.SystemTheme)
			title.actor.add_style_class_name("dayTitle");
		
		this.tasksBox.add(title.actor,{y_align: St.Align.START,y_fill: false});
		actors.push(title);
		
		// Day tasks
		if (!running)
		{
			this.displayBlockedItem(_("GTG is closed"));
		}
		else
		{
			var nbTasks = 0;
			// First block
			for (i=0; i<allTasks.length; i++)
			{
				let ret = allTasks[i].startdate.split('-');
				let startDate = new Date(ret[0],ret[1]-1,ret[2]);

				// If start date == day selected, display on first block
				// Display also if keywords "now"
				if (this.compareDays(day,startDate) == 0 
					|| (isToday && allTasks[i].duedate == "now"))
				{
					nbTasks++;
					this.displayTask(allTasks[i],false);
				}
				
				// Keyword "soon"
				if (allTasks[i].startdate == "" || this.compareDays(startDate,day) == -1)
				{
					if ((isToday || isTomorrow) && allTasks[i].duedate == "soon")
					{
						nbTasks++;
						this.displayTask(allTasks[i],false);
					}
				}
			}			
			
			// Second block
			for (i=0; i<allTasks.length; i++)
			{
				let ret = allTasks[i].startdate.split('-');
				let startDate = new Date(ret[0],ret[1]-1,ret[2]);
				ret = allTasks[i].duedate.split('-');
				let dueDate = new Date(ret[0],ret[1]-1,ret[2]);
				
				// Check preferences and hide long tasks if needed
				if (prefs.DisplayLong || ( !this.longTask(day,startDate) && !this.longTask(day,dueDate)))	
				{
					// Display multiple days tasks with start date
					if (this.compareDays(startDate,day) == -1)
					{
						if (allTasks[i].duedate == "someday")
						{
							nbTasks++;
							this.displayTask(allTasks[i],true);
						}
						if (!this.validDay(dueDate) && allTasks[i].duedate != "soon" && allTasks[i].duedate != "someday")
						{
							nbTasks++;
							this.displayTask(allTasks[i],true);
						}
						else if (this.validDay(dueDate)
							&& this.compareDays(dueDate,day) != -1)
						{
							nbTasks++;
							this.displayTask(allTasks[i],true);
						}
					}
					
					// If keyword "someday"
					else if (allTasks[i].startdate == "" && allTasks[i].duedate == "someday")
					{
						nbTasks++;
						this.displayTask(allTasks[i],true);
					}
				
					// Display multiple days tasks without start date
					else if (!this.validDay(startDate))
					{
						if (this.validDay(dueDate)
							&& this.compareDays(dueDate,day) != -1)
						{
							nbTasks++;
							this.displayTask(allTasks[i],true);
						}
					}
				}
			}
			
			if (nbTasks < 1)
				this.displayBlockedItem(_("Nothing Scheduled"));
		}		
	}