function ($place, att) {

            var template =

                '<div class="calendar">' +

                    '<div class="nav">' +

                        '<div class="current button">{{currentMonth.date | date:"MMMM"}}</div>' +

                        '<div class="prev button" ng-click="prevMonth()">prev</div>' +

                        '<div class="next button" ng-click="nextMonth()">next</div>' +

                    '</div>' +

                    '<div class="head">' +

                        '<div>{{weekdays[1]}}</div>' +

                        '<div>{{weekdays[2]}}</div>' +

                        '<div>{{weekdays[3]}}</div>' +

                        '<div>{{weekdays[4]}}</div>' +

                        '<div>{{weekdays[5]}}</div>' +

                        '<div>{{weekdays[6]}}</div>' +

                        '<div>{{weekdays[0]}}</div>' +

                    '</div>' +

                    '<div class="body">' +

                        '<div class="months">' +

                            '<div class="days">' +

                                '<div class="day" ng-repeat="day in currentMonth.days"' +

								'                 ng-class="{today: isToday(day), \'other-month\': !isCurrentMonth(day)}"' +

                                '                 aria-selected="{{isSelected(day)}}"' +

                                '                 ng-click="select(day)" title="{{day | date}}">' +

                                   '{{day.getDate()}}' +

                                '</div>' +

                            '</div>' +

                        '</div>' +

                    '</div>' +

                '</div>';



            var link = function (scope, $element) {

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

            };



            return function (scope, $element) {

                if ($element.get(0).nodeName == 'INPUT') {

                    scope.element = $element;

                    $compile('<popout input="element">' + template + '</popout>')(scope, function (clone) {

                        link(scope, clone);



                        scope.$watch('selecteddate', function (val) {

                            $element.val($filter('date')(val));

                        });



                        $element.change(function (val) {

                            var date = new Date($element.val())

                            scope.$apply(function () {

                                scope.selecteddate = date;

                            });

                        });



                        clone.insertAfter($element);

                    });

                }

                else {

                    $compile(template)(scope, function (clone) {

                        link(scope, clone);

                        clone.appendTo($element);

                    });

                }

            };

        }