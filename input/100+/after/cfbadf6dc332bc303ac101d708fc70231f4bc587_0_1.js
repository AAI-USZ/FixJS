function($weekDay, $calEvent, newCalEvent, oldCalEvent, maintainEventDuration) {
          var options = this.options;

          if (options.allowCalEventOverlap) {
            return;
          }
          var adjustedStart, adjustedEnd;
          var self = this;

          var freeBusyManager = self.getFreeBusyManagerForEvent(newCalEvent);
          $.each(freeBusyManager.getFreeBusys(newCalEvent.start, newCalEvent.end), function() {
              if (!this.getOption('free')) {

                  if (newCalEvent.start.getTime() == this.getStart().getTime() &&
                      newCalEvent.end.getTime() > this.getEnd().getTime()) {

                      adjustedStart = this.getEnd();
                  }

                  if (newCalEvent.end.getTime() == this.getEnd().getTime() &&
                      newCalEvent.start.getTime() < this.getStart().getTime()) {

                      adjustedEnd = this.getStart();
                  }

                  if (oldCalEvent.resizable == false ||
                      (newCalEvent.end.getTime() > this.getEnd().getTime() &&
                       newCalEvent.start.getTime() < this.getStart().getTime()) ||
                      (newCalEvent.end.getTime() == this.getEnd().getTime() &&
                       newCalEvent.start.getTime() == this.getStart().getTime())) {

                      adjustedStart = oldCalEvent.start;
                      adjustedEnd = oldCalEvent.end;
                      newCalEvent.userId = oldCalEvent.userId;
                  }
              }
          });

          $weekDay.find('.wc-cal-event').not($calEvent).each(function() {
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
                newCalEvent.userId = oldCalEvent.userId;
                return false;
            }

          });


          newCalEvent.start = adjustedStart || newCalEvent.start;

          if (adjustedStart && maintainEventDuration) {
            newCalEvent.end = new Date(adjustedStart.getTime() + (oldCalEvent.end.getTime() - oldCalEvent.start.getTime()));
            self._adjustForEventCollisions($weekDay, $calEvent, newCalEvent, oldCalEvent);
          } else {
            newCalEvent.end = adjustedEnd || newCalEvent.end;
          }


          //reset if new cal event has been forced to zero size
          if (newCalEvent.start.getTime() >= newCalEvent.end.getTime()) {
            newCalEvent.start = oldCalEvent.start;
            newCalEvent.end = oldCalEvent.end;
          }

          $calEvent.data('calEvent', newCalEvent);
      }