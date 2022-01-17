function(phaseId) {
      var available, balance, hours, proj, projHours, projects, work, _i, _len;
      projHours = this.hourBalance(phaseId);
      projects = [];
      available = [];
      work = [];
      balance = [];
      hours = [];
      for (_i = 0, _len = projHours.length; _i < _len; _i++) {
        proj = projHours[_i];
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
      this.hoursChartOptions.xAxis.categories = projects;
      this.hoursChartOptions.series = hours;
      this.hoursChart.destroy;
      return this.hoursChart = new Highcharts.Chart(this.hoursChartOptions);
    }