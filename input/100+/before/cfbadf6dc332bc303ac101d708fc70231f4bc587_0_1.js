function() {
            var currentCalEvent = $(this).data('calEvent');

            //has been dropped onto existing event overlapping the end time
            if (newCalEvent.start.getTime() < currentCalEvent.end.getTime() &&
                  newCalEvent.end.getTime() >= currentCalEvent.end.getTime()) {

                adjustedStart = currentCalEvent.end;
            }


            //has been dropped onto existing event overlapping the start time
            if (newCalEvent.end.getTime() > currentCalEvent.start.getTime() &&
                  newCalEvent.start.getTime() <= currentCalEvent.start.getTime()) {

                adjustedEnd = currentCalEvent.start;
            }
            //has been dropped inside existing event with same or larger duration
            if (oldCalEvent.resizable == false ||
                  (newCalEvent.end.getTime() <= currentCalEvent.end.getTime() &&
                    newCalEvent.start.getTime() >= currentCalEvent.start.getTime())) {

                adjustedStart = oldCalEvent.start;
                adjustedEnd = oldCalEvent.end;
                return false;
            }

          }