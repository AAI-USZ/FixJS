function(data) {
      var proj, releaseBacklog, _i, _len, _ref;
      this.release = Release.create(data);
      document.title = data.Title;
      releaseBacklog = [];
      _ref = this.release.projects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        proj = _ref[_i];
        releaseBacklog = releaseBacklog.concat(proj.backlog);
      }
      this.release.group('state', releaseBacklog);
      this.viewModel = new ReleaseViewmodel(this.release);
      ko.applyBindings(this.viewModel);
      this.viewModel.selectedPhaseId(this.viewModel.release.phases[0].id);
      return showStatusChart(this.viewModel.statusData());
    }