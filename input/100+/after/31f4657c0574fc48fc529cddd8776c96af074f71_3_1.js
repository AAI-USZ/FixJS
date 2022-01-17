function(jsonData) {
      var phase, project, release, _i, _j, _len, _len2, _ref, _ref2;
      console.log(jsonData);
      release = new Release(jsonData.Id, DateFormatter.createJsDateFromJson(jsonData.StartDate), DateFormatter.createJsDateFromJson(jsonData.EndDate), jsonData.Title, jsonData.TfsIterationPath, jsonData.ParentId);
      _ref = jsonData.Phases;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        phase = _ref[_i];
        release.addPhase(Phase.create(phase));
      }
      _ref2 = jsonData.Projects;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        project = _ref2[_j];
        release.addProject(Project.create(project));
      }
      console.log(release);
      return release;
    }