function(period) {
      var absence, absent, available, overlappingAbsences, _i, _len, _ref;
      absent = 0;
      _ref = this.periodsAway;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        absence = _ref[_i];
        if (absence.overlaps(period)) overlappingAbsences = absence;
      }
      if (typeof overlappingAbsences === !"undefined" && overlappingAbsences === !null) {
        absent = ((function() {
          var _j, _len2, _results;
          _results = [];
          for (_j = 0, _len2 = overlappingAbsences.length; _j < _len2; _j++) {
            absence = overlappingAbsences[_j];
            _results.push(absence.overlappingPeriod(period).workingDaysRemaining());
          }
          return _results;
        })()).reduce(function(init, x) {
          console.log(x);
          return init + x;
        });
      }
      available = (period.workingDaysRemaining() - absent) * 8;
      return available;
    }