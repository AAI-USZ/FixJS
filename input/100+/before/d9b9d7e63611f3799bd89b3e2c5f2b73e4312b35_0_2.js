function(tItem){
					var id = tItem.id,
						name = tItem.name,
						starttime = tItem.starttime.split("-");
						duration = tItem.duration,
						percentage = tItem.percentage,
						previousTaskId = tItem.previousTaskId,
						taskOwner = tItem.taskOwner;
					
					var task = new GanttTaskItem({
						id: id,
						name: name,
						startTime: new Date(starttime[0], (parseInt(starttime[1]) - 1), starttime[2]),
						duration: duration,
						percentage: percentage,
						previousTaskId: previousTaskId,
						taskOwner: taskOwner
					});
					var ctItems = tItem.children;
					if(ctItems.length != 0){
						this.buildChildTasksData(task, ctItems);
					}
					project.addTask(task);
				}