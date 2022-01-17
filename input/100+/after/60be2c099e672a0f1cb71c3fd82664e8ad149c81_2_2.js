function ReleaseViewmodel(release) {
      var ph, phase, statusgroup, _i, _j, _len, _len2, _ref, _ref2,
        _this = this;
      this.release = release;
      this.hourBalance = __bind(this.hourBalance, this);
      this.loadProjects = __bind(this.loadProjects, this);
      this.fromNowTillEnd = new Period(new Date(), this.release.endDate.date, "from now till end");
      this.projects = [];
      this.statuses = [];
      this.currentPhases = [];
      this.hoursChartOptions = {
        chart: {
          renderTo: 'chart-hours',
          type: 'column'
        },
        title: {
          text: 'Workload overview'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: 'Hours'
          }
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.series.name + '</b><br/>' + this.y + ' ' + this.x.toLowerCase();
          }
        }
      };
      this.hoursChart = new Highcharts.Chart(this.hoursChartOptions);
      _ref = this.release.sets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        statusgroup = _ref[_i];
        if (statusgroup.groupedBy === "state") {
          this.statuses.push(statusgroup.label);
        }
      }
      _ref2 = this.release.phases;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        phase = _ref2[_j];
        if (!(phase.isCurrent())) continue;
        ph = new Period(this.currentDate(), phase.endDate.date, "");
        phase.workingDaysRemaining = ph.workingDays();
        this.currentPhases.push(phase);
      }
      this.selectedPhaseId = ko.observable();
      this.selectedPhaseId.subscribe(function(newValue) {
        console.log(newValue);
        return _this.redrawChart(newValue);
      });
      this.disgardedStatuses = ko.observableArray();
      this.disgardedStatuses.subscribe(function(newValue) {
        return _this.redrawChart(_this.selectedPhaseId);
      });
      this.loadProjects();
    }