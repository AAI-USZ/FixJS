function() {
      var available, hoursPresent;
      hoursPresent = this.resource.hoursAvailable(this.assignedPeriod);
      available = Math.round(hoursPresent * this.focusFactor);
      return available;
    }