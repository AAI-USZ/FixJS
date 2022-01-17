function(releases, resources) {
      var loadReleases;
      loadReleases = new HLoadReleases();
      releases = loadReleases.execute(releases);
      resources = Resource.createCollection(resources);
      this.viewModel = new PlanResourcesViewmodel(releases, resources);
      this.viewModel.selectRelease(this.viewModel.allReleases()[0]);
      return ko.applyBindings(this.viewModel);
    }