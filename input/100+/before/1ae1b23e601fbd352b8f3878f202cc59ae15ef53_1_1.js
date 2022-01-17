function(Y){

	var ProjectCalendar,

		YObject = Y.Object,

		YLang = Y.Lang;

	

	ProjectCalendar = function() {

		this.data = {

			dummy: 'dummy'

		};

	};

	

	ProjectCalendar.prototype = {

		calcTaskEndDate: function(taskId, prevStartDate, newStartDate, prevWorkHours, newWorkHours) {

			var data = this.data,

				endDate,

				dateKey,

				dateEntry,

				duration;

				

			//Y.log('calcTaskEndDate ' + taskId + ' ' + prevStartDate + ' ' + newStartDate + ' ' + prevWorkHours + ' ' + newWorkHours);

			

			if (prevStartDate) {

				prevWorkHours = prevWorkHours || 0;

				

				//Y.log(prevWorkHours);

				

				while (prevWorkHours > 0){

					dateKey = this._getDateAsKey(prevStartDate);

					dateEntry = data[dateKey];

					

					if (dateEntry) {

						if (YObject.hasKey(dateEntry, taskId)) {

							var workDone = dateEntry[taskId];

							prevWorkHours -= workDone;

							delete dateEntry[taskId]; 

							prevStartDate = this.getNextWorkingDay(prevStartDate);

						} else {

							break;

						}

					} else {

						break;

					}

				}

			}

			

			if (newStartDate){

				endDate = newStartDate;

				newWorkHours = newWorkHours || 0;

				

				while (newWorkHours > 0){

					if (newWorkHours > ProjectCalendar.MAX_HOURS_PER_DAY){

						this._setTaskHoursOnDate(taskId, ProjectCalendar.MAX_HOURS_PER_DAY, endDate);

						newWorkHours -= ProjectCalendar.MAX_HOURS_PER_DAY;

						endDate = this.getNextWorkingDay(endDate);

					} else {

						this._setTaskHoursOnDate(taskId, newWorkHours, endDate);

						newWorkHours = 0;

					}

				}

			}

			return endDate;

		},

		

		_getDateAsKey: function(date){

			return Y.DataType.Date.format(date, {format: '%Y%m%d'});

		},

		

		_setTaskHoursOnDate: function(taskId, hours, date) {

			var data = this.data,

				dateKey = this._getDateAsKey(date),

				dateEntry;

							

			if (YObject.hasKey(data, dateKey)) {

				dateEntry = data[dateKey];

			} else {

				dateEntry = {};

				data[dateKey] = dateEntry;

			}

			

			dateEntry[taskId] = hours;

		},

		

		getNextWorkingDay: function(date){

			do {

				date = Y.DataType.Date.addDays(date, 1);	

			} while (!this._isWorkingDay(date));

			

			return date;

		},

		

		_isWorkingDay: function(date){

			var weekDay = date.getDay();

			

			if (weekDay === 0 || weekDay === 6){

				return false;

			}

			return true;

		}

	};

	

	ProjectCalendar.MAX_HOURS_PER_DAY = 8;

	

	Y.ProjectCalendar = new ProjectCalendar();



/**

 *This is how the data property of ProjectCalendar will be maintained, per resource/task and per task/resource basis 
 *
	{

		'2012-05-18': { 

			ResA: {

				'task_1': 4,

				'task_2': 4

			}, 

			

			ResB: {

			},

	

			'task_1': {

				'ResA': 4

			}

		}

	}

*/
}