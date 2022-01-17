function() {
      var proj, project, _i, _len, _ref, _results,
        _this = this;
      _ref = this.release.projects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        project = _ref[_i];
        proj = {};
        proj.projectname = project.shortName;
        proj.link = "#" + project.shortName;
        proj.backlog = project.backlog;
        proj.totalHours = (function(proj) {
          return ko.computed(function() {
            var t;
            t = 0;
            $.each(proj.backlog, function(n, l) {
              var _ref2;
              if (!(_ref2 = l.state, __indexOf.call(_this.disgardedStatuses(), _ref2) >= 0)) {
                return t += l.remainingHours;
              }
            });
            return t;
          });
        })(proj);
        _results.push(this.projects.push(proj));
      }
      return _results;
    }