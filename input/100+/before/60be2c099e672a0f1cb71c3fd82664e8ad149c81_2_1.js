function(newValue) {
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
      }