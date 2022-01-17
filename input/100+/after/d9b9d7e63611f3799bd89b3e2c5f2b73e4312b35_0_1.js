function(predTask, ctask, ctaskObj){
			var newDate = new Date(predTask.startTime);
			newDate.setHours(newDate.getHours() + (predTask.duration / this.hsPerDay * 24));
			if(newDate.getHours() > 0){
				newDate.setHours(0);
				newDate.setDate(newDate.getDate() + 1);
			}
			ctaskObj ? (ctaskObj.setStartTime(newDate, true)) : (ctask.startTime = newDate);
			if(ctask.parentTask){
				if(!this.checkPosParentTask(ctask.parentTask, ctask)){
					var newDate2 = new Date(ctask.parentTask.startTime);
					newDate2.setHours(newDate2.getHours() + (ctask.parentTask.duration / this.hsPerDay * 24));
					ctask.duration = parseInt((parseInt((newDate2 - ctask.startTime) / (1000 * 60 * 60))) * this.hsPerDay / 24);
				}
			}
		}