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
          categories: ['Pief', 'Paf', 'Poef']
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
      this.categories = ko.observableArray(['aap', 'noot', 'mies']);
      _ref = this.release.sets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        statusgroup = _ref[_i];
        if (statusgroup.groupedBy === "state") {
          this.statuses.push(statusgroup.label);
        }
      }
      _ref2 = this.phases();
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        phase = _ref2[_j];
        if (!(phase.isCurrent())) continue;
        ph = new Period(this.currentDate(), phase.endDate.date, "");
        phase.workingDaysRemaining = ph.workingDays();
        this.currentPhases.push(phase);
      }
      this.selectedPhaseId = ko.observable();
      this.selectedPhaseId.subscribe(function(newValue) {
        var available, balance, hours, proj, projHours, projects, work, _k, _len3;
        projHours = _this.hourBalance(newValue);
        console.log("from subscription: " + ko.toJSON(projHours));
        projects = [];
        available = [];
        work = [];
        balance = [];
        hours = [];
        for (_k = 0, _len3 = projHours.length; _k < _len3; _k++) {
          proj = projHours[_k];
          projects.push(proj.projectname);
          available.push(proj.availableHours);
          work.push(proj.workload);
          balance.push(proj.balance);
        }
        hours.push({
          name: 'Available Hrs',
          data: available
        });
        hours.push({
          name: 'Work Remaining',
          data: work
        });
        hours.push({
          name: 'Balance',
          data: balance
        });
        console.log(projects);
        console.log(ko.toJSON(hours));
        _this.hoursChartOptions.xAxis.categories = projects;
        _this.hoursChartOptions.series = hours;
        _this.hoursChart.destroy;
        return _this.hoursChart = new Highcharts.Chart(_this.hoursChartOptions);
      });
      this.disgardedStatuses = ko.observableArray();
      this.disgardedStatuses.subscribe(function(newValue) {});
      this.loadProjects();
    }