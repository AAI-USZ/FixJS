function(width){
			var maxEndPos = arrayUtil.map(this.arrProjects, function(project){
				return (parseInt(project.projectItem[0].style.left) + parseInt(project.projectItem[0].firstChild.style.width)
					+ project.descrProject.offsetWidth + this.panelTimeExpandDelta);
			}, this).sort(function(a,b){return b-a})[0];
			if(this.maxTaskEndPos != maxEndPos){
				//reset panel time
				var prows = this.panelTime.firstChild.firstChild.rows;
				for(var i = 0; i <= 4; i++){//prows.length
					this.removeCell(prows[i]);
				}
				var countDays = Math.round((maxEndPos+this.panelTimeExpandDelta) / this.pixelsPerDay);
				this.totalDays = countDays;
				//year
				var oldYear, newYear, ycount = 0;
				newYear = oldYear = new Date(this.startDate).getFullYear();
				for(var i = 0; i < countDays; i++, ycount++){
					var date = new Date(this.startDate);
					date.setDate(date.getDate() + i);
					newYear = date.getFullYear();
					if(newYear != oldYear){
						this.addYearInPanelTime(prows[0], ycount, oldYear);
						ycount = 0;
						oldYear = newYear;
					}
				}
				this.addYearInPanelTime(prows[0], ycount, newYear);
				//month
				var oldMonth, newMonth, mcount = 0, lastYear = 1970;
				newMonth = oldMonth = new Date(this.startDate).getMonth();
				for(var i = 0; i < countDays; i++, mcount++){
					var date = new Date(this.startDate);
					date.setDate(date.getDate() + i);
					newMonth = date.getMonth();
					lastYear = date.getFullYear();
					if(newMonth != oldMonth){
						this.addMonthInPanelTime(prows[1], mcount, oldMonth, lastYear);
						mcount = 0;
						oldMonth = newMonth;
					}
				}
				this.addMonthInPanelTime(prows[1], mcount, newMonth, lastYear);
				//week
				var oldWeek, newWeek, mcount = 0;
				newWeek = oldWeek = locale._getWeekOfYear(new Date(this.startDate));
				for(var i = 0; i < countDays; i++, mcount++){
					var date = new Date(this.startDate);
					date.setDate(date.getDate() + i);
					newWeek = locale._getWeekOfYear(date);
					if(newWeek != oldWeek){
						this.addWeekInPanelTime(prows[2], mcount, oldWeek);
						mcount = 0;
						oldWeek = newWeek;
					}
				}
				this.addWeekInPanelTime(prows[2], mcount, newWeek);
				//day
				for(var i = 0; i < countDays; i++){
					this.addDayInPanelTime(prows[3]);
				}
				//hour
				for(var i = 0; i < countDays; i++){
					this.addHourInPanelTime(prows[4]);
				}
				this.panelTime.firstChild.firstChild.style.width = this.pixelsPerDay * (prows[3].cells.length) + "px";
				this.contentData.firstChild.style.width = this.pixelsPerDay * (prows[3].cells.length) + "px";
				this.maxTaskEndPos = maxEndPos;
			}
		}