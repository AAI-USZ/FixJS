function(selectedPhaseId) {
      var available, balanceHours, feat, item, phase, phaseId, proj, projs, releasePhases, remainingHours, res, _i, _len, _ref;
      phaseId = selectedPhaseId;
      releasePhases = this.release.phases;
      projs = [];
      balanceHours = [];
      phase = ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = releasePhases.length; _i < _len; _i++) {
          item = releasePhases[_i];
          if (+item.id === +phaseId) _results.push(item);
        }
        return _results;
      })())[0];
      _ref = this.release.projects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        proj = _ref[_i];
        console.log(proj);
        remainingHours = ((function() {
          var _j, _len2, _ref2, _results;
          _ref2 = proj.backlog;
          _results = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            feat = _ref2[_j];
            _results.push(feat.remainingHours);
          }
          return _results;
        })()).reduce(function(acc, x) {
          return acc + x;
        });
        console.log("remainingHours: " + remainingHours);
        available = 0;
        console.log(proj.resources);
        if (proj.resources.length > 0) {
          console.log("proj.resources not empty");
          available = ((function() {
            var _j, _len2, _ref2, _results;
            _ref2 = proj.resources;
            _results = [];
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              res = _ref2[_j];
              _results.push(res.availableHours());
            }
            return _results;
          })()).reduce(function(acc, x) {
            console.log(x);
            return acc + x;
          });
        }
        console.log("available: " + available);
        balanceHours.push({
          projectname: proj.shortName,
          availableHours: available,
          workload: remainingHours,
          balance: Math.round(available - remainingHours)
        });
      }
      console.log("balanceHours: " + ko.toJSON(balanceHours));
      return balanceHours;
    }