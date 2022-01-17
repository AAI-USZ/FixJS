function(data) {
      var projectMembers;
      projectMembers = [];
      console.log(data);
      this.release = Release.create(data);
      document.title = data.Title;
      this.viewModel = new ReleaseViewmodel(this.release);
      ko.applyBindings(this.viewModel);
      this.viewModel.selectedPhaseId(this.viewModel.phases()[0].id);
      return showStatusChart(this.viewModel.statusData());
    }