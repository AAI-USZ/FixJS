function() {
      var available, hoursPresent;
      console.log("assigned period " + this.assignedPeriod);
      console.log("resource " + this.resource.initials);
      hoursPresent = this.resource.hoursAvailable(this.assignedPeriod);
      console.log("hours present " + hoursPresent);
      available = Math.round(hoursPresent * this.focusFactor);
      console.log("hours available corrected with assignment focus factor " + this.focusFactor + ": " + available);
      return available;
    }