function(date) {
      var events = this.app.store('Event'),
          eventItems = events.eventsForDay(date),
          self = this,
          eventHtml = [],
          groupsByHour = [];

      if (eventItems.length === 0) {
        return '';
      }

      var sorted = eventItems.sort(function(a, b) {
        var aHour = a.date.getHours(),
            bHour = b.date.getHours();

        if (aHour === bHour) {
          return 0;
        }

        if (aHour < bHour) {
          return -1;
        } else {
          return 1;
        }

      });

      var lastHour,
          batch = [];

      sorted.forEach(function(item) {
        var hour = item.date.getHours();

        if (hour != lastHour) {
          lastHour = hour;
          if (batch.length > 0) {
            eventHtml.push(self._renderEventsForHour(batch));
            batch = [];
          }
        }

        batch.push(item);
      });

      eventHtml.push(self._renderEventsForHour(batch));

      return eventHtml.join('');
    }