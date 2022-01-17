function (scope, $element) {

                scope.selecteddate = scope.selecteddate || new Date;

				scope.weekdays = $locale.DATETIME_FORMATS.SHORTDAY;

				

                scope.currentMonth = {

                    date: new Date,

                    days: []

                };

				

				scope.isToday = function(date) {

					return (new Date).getDayDate().valueOf() == date.getDayDate().valueOf();

				}

				

				scope.isCurrentMonth = function(date) {

					return scope.selecteddate.getMonthDate().valueOf() == date.getMonthDate().valueOf();

				}



                scope.nextMonth = function () {

                    scope.selecteddate = scope.selecteddate.addMonths(1);

                };



                scope.prevMonth = function () {

                    scope.selecteddate = scope.selecteddate.addMonths(-1);

                };

				

				scope.isSelected = function(date) {

					var datevalue = date.getDayDate().valueOf();

					if (scope.selecteddates != null) {

						return scope.selecteddates.indexOf(datevalue) != -1;

					}

					

					return scope.selecteddate.getDayDate().valueOf() == datevalue;

				};



                scope.select = function (date) {

                    scope.selecteddate = date;

					var datevalue = date.getDayDate().valueOf();



					if (scope.selecteddates == null) return;



					if (scope.selecteddates.indexOf(datevalue) != -1) {

						scope.selecteddates.remove(datevalue);

					}

					else {

						scope.selecteddates.push(datevalue);

					}

                };

				

                scope.$watch('selecteddate', function (date, oldDate) {

					if( !Date.isValid(date)) {

						if (Date.isValid(oldDate)) {

							scope.selecteddate = oldDate;

						}

						

						return;

					}

					

                    var monthsdiff = date.getMonthDate().valueOf() - oldDate.getMonthDate().valueOf();



                    $element.removeClass('slidein-from-right slidein-from-left');

                    $timeout(function () {

                        if (monthsdiff > 0) {

                            $element.addClass('slidein-from-right');

                        }

                        else if (monthsdiff < 0) {

                            $element.addClass('slidein-from-left');

                        }

                    });



                    if (monthsdiff != 0) {						

                        generateMonth();

                    }

					else {

						if (scope.popout != null) {

							scope.popout.show = false;

						}

					}

                });



                var loadDays = function (date) {

                    var firstday = date.firstDayOfMonth().firstDayOfWeek();



                    if (firstday.getDate() == 1) {

                        firstday = firstday.addDays(-7);

                    }



                    return Array.range(0, 42, function(i) {

                       var day = firstday.addDays(i);

                        scope.currentMonth.days[i] = day;

                        return day;

                    });

                };



                var generateMonth = function () {

                    scope.currentMonth.date = new Date(scope.selecteddate.getFullYear(), scope.selecteddate.getMonth() + 1, 0);

                    loadDays(scope.currentMonth.date);

                }



                generateMonth();

            }