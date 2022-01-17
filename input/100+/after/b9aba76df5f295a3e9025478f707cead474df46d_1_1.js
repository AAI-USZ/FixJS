function (scope, $element) {

                scope.selecteddate = scope.selecteddate || new Date;

				scope.weekdays = $locale.DATETIME_FORMATS.SHORTDAY;

				

                scope.currentMonth = {

                    date: scope.selecteddate.getMonthDate(),

                    days: []

                };

				

				scope.isToday = function(date) {

					return (new Date).getDayDate().valueOf() == date.getDayDate().valueOf();

				}

				

				scope.isCurrentMonth = function(date) {

					return scope.currentMonth.date.valueOf() == date.getMonthDate().valueOf();

				}



                scope.nextMonth = function () {

                    scope.changeMonth(1);

                };



                scope.prevMonth = function () {

                    scope.changeMonth(-1);

                };

				

				scope.isSelected = function(date) {

					var datevalue = date.getDayDate().valueOf();

					if (scope.selecteddates != null) {

						return scope.selecteddates.indexOf(datevalue) != -1;

					}

					

					return scope.selecteddate.getDayDate().valueOf() == datevalue;

				};



                scope.changeMonth = function(diff) {

                    scope.currentMonth.date = scope.currentMonth.date.addMonths(diff).getMonthDate();



                }

                scope.select = function (date) {



                    scope.selecteddate = date;

                    scope.currentMonth.date = date.getMonthDate();



                    if (scope.popout != null) {

                        scope.popout.show = false;

                    }



                    if (scope.selecteddates == null) return;

                    var datevalue = date.getDayDate().valueOf();



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

                });



                scope.$watch('currentMonth.date', function(newMonth, oldMonth) {

                    newMonth = newMonth.getMonthDate();

                    oldMonth = oldMonth.getMonthDate();

                    var monthsdiff =  newMonth.valueOf() - oldMonth.valueOf();



                    if(monthsdiff == 0) return;



                    $element.removeClass('slidein-from-right slidein-from-left');

                    $timeout(function () {

                        if (monthsdiff > 0) {

                            $element.addClass('slidein-from-right');

                        }

                        else if (monthsdiff < 0) {

                            $element.addClass('slidein-from-left');

                        }

                    });



                    $timeout(function() {

                        generateMonth(newMonth);

                    }, 40); //timeout to keep in sync with animation (10% of duration)

                });



                var loadDays = function (monthDate) {

                    var firstday = monthDate.firstDayOfWeek();



                    if (firstday.getDate() == 1) {

                        firstday = firstday.addDays(-7);

                    }



                    return Array.range(0, 42, function(i) {

                       var day = firstday.addDays(i);

                        scope.currentMonth.days[i] = day;

                        return day;

                    });

                };



                var generateMonth = function (monthDate) {

                    loadDays(monthDate);

                };



                generateMonth(scope.currentMonth.date);

            }