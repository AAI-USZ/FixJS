function(){
			var panelTime = domConstruct.create("div", {className: "ganttPanelTime"});
			var tblTime = domConstruct.create("table", {
				cellPadding: "0px",
				border: "0px",
				cellSpacing: "0px",
				bgColor: "#FFFFFF",
				className: "ganttTblTime"
			}, panelTime);
			this.totalDays = this.countDays;
			//year
			var newYearRow = tblTime.insertRow(tblTime.rows.length), newYear = oldYear = new Date(this.startDate).getFullYear(), ycount = 0;
			for(var i = 0; i < this.countDays; i++, ycount++){
				var date = new Date(this.startDate);
				date.setDate(date.getDate() + i);
				newYear = date.getFullYear();
				if(newYear != oldYear){
					this.addYearInPanelTime(newYearRow, ycount, oldYear);
					ycount = 0;
					oldYear = newYear;
				}
			}
			this.addYearInPanelTime(newYearRow, ycount, newYear);
			domStyle.set(newYearRow, "display", "none");
			//month
			var newMonthRow = tblTime.insertRow(tblTime.rows.length), newMonth = oldMonth = new Date(this.startDate).getMonth(), mcount = 0, lastYear = 1970;
			for(var i = 0; i < this.countDays; i++, mcount++){
				var date = new Date(this.startDate);
				date.setDate(date.getDate() + i);
				newMonth = date.getMonth();
				lastYear = date.getFullYear();
				if(newMonth != oldMonth){
					this.addMonthInPanelTime(newMonthRow, mcount, oldMonth, lastYear);
					mcount = 0;
					oldMonth = newMonth;
				}
			}
			this.addMonthInPanelTime(newMonthRow, mcount, newMonth, lastYear);
			//week
			var newWeekRow = tblTime.insertRow(tblTime.rows.length), newWeek = oldWeek = locale._getWeekOfYear(new Date(this.startDate)), mcount = 0;
			for(var i = 0; i < this.countDays; i++, mcount++){
				var date = new Date(this.startDate);
				date.setDate(date.getDate() + i);
				newWeek = locale._getWeekOfYear(date);
				if(newWeek != oldWeek){
					this.addWeekInPanelTime(newWeekRow, mcount, oldWeek);
					mcount = 0;
					oldWeek = newWeek;
				}
			}
			this.addWeekInPanelTime(newWeekRow, mcount, newWeek);
			//day
			var newDayRow = tblTime.insertRow(tblTime.rows.length);
			for(var i = 0; i < this.countDays; i++){
				this.addDayInPanelTime(newDayRow);
			}
			//hour
			var newHourRow = tblTime.insertRow(tblTime.rows.length);
			for(var i = 0; i < this.countDays; i++){
				this.addHourInPanelTime(newHourRow);
			}
			domStyle.set(newHourRow, "display", "none");
			return panelTime;
		}