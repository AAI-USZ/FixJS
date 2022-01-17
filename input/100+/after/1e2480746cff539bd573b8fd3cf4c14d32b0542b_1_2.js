function (date, oldDate) {

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

                }