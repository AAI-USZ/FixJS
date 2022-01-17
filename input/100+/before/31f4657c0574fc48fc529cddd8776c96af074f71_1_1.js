function() {
      var absence, absentHours, availableHours, periodAway, remainingAbsence, restPeriod, start, startDate, today, _i, _len, _ref;
      today = new Date();
      if (today > this.phase.endDate.date) {
        return 0;
      } else {
        console.log("available hours for: " + this.teamMember.initials);
        console.log("in phase: " + (this.phase.toString()));
        if (today > this.phase.startDate.date && today > (member.startDate = today)) {} else {
          startDate = this.phase.startDate.date;
        }
        restPeriod = new Period(startDate, this.phase.endDate.date, this.phase.title);
        console.log("period from now: " + restPeriod);
        absentHours = 0;
        _ref = this.teamMember.periodsAway;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          absence = _ref[_i];
          if (!(absence.overlaps(this.phase))) continue;
          periodAway = absence.overlappingPeriod(this.phase);
          if (today > absence.startDate.date) {
            start = today;
          } else {
            start = absence.startDate.date;
          }
          remainingAbsence = new Period(start, periodAway.endDate.date, 'remaining absence from now');
          absentHours += remainingAbsence.workingHours();
        }
        availableHours = restPeriod.workingHours() - absentHours;
        console.log("availableHours: " + availableHours);
        return this.teamMember.focusFactor * availableHours;
      }
    }