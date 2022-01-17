function (options) {
    var self = this;

    // Constructor for the updater.
    self.constructor = function () {
      self.isOpen = false;
      self.options = options;

      self.date = options.date;
      self.nid = options.nid;

      // The status is always updated every 10 seconds. This does not
      // remote calls, and is not computationally intensive, so it should
      // not be a burden on either server or client.
      self.updateInterval = window.setInterval(self.update, 10000);

      return self;
    };

    // Helper function to split time string into numbers.
    self.splitTime = function (time) {
      var parts = time.split(':');

      if (parts.length === 2) {
        return {
          hours: parseInt(parts[0], 10),
          minutes: parseInt(parts[1], 10),
        };
      }
    };

    // Recalculate opening status for a library.
    // Returns true if library is open, false if not.
    self.calculateOpenStatus = function () {
      var instances, isOpen = false;

      // Get opening hours instances for the date in question.
      instances = Drupal.OpeningHours.dataStore[self.nid][self.date.getISODate()] || [];

      $.each(instances, function () {
        var open = self.splitTime(this.start_time),
            close = self.splitTime(this.end_time),
            hours = self.date.getHours(),
            minutes = self.date.getMinutes();

        // Now we have all the data we need, figure out if we're open.
        if ((hours > open.hours ||
            hours === open.hours && minutes >= open.minutes) &&
            (hours < close.hours ||
            hours === close.hours && minutes < close.minutes)) {
         isOpen = true;
        }
      });

      self.isOpen = isOpen;
    };

    // Render the current opening status.
    self.render = function () {
      if (Drupal.OpeningHours.dataStore[self.nid]) {
        self.calculateOpenStatus();
      }

      // Add our element to the DOM, if neccessary.
      if (!self.el) {
        self.el = $('<div class="library-openstatus"></div>');
        self.el.appendTo($(self.options.container).parent('.node-teaser-library').find('.picture'));

        // Save the view instance for later reference.
        self.el.data('statusIndicatorInstance', self);
      }

      if (self.isOpen) {
        self.el.removeClass('closed');
        self.el.addClass('open');
        self.el.text(Drupal.t('Open'));
      }
      else {
        self.el.addClass('closed');
        self.el.removeClass('open');
        self.el.text(Drupal.t('Closed'));
      }

      // Trigger an evert so other scripts can react to the change.
      $(window).trigger('DingLibraryStatusChange', [self.nid, self.isOpen]);
    };

    // Update our display with a new date value.
    self.update = function (date) {
      var currentState = self.isOpen;
      // Default to current date.
      date = date || new Date();

      // Overwrite the date and recalculate status.
      self.date = date;
      self.calculateOpenStatus();

      // If state changed, re-render.
      if (currentState !== self.isOpen) {
        self.render();
      }
    };

    return self.constructor();
  }