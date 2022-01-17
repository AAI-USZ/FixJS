function(project) {
      var view = new ProjectView({
        model: project,
        screens: screens
      });
      this.$projectList.append(view.render().$el);

      if (this.initialProjectId === project.id) {
        view.forceActive();
        this.initialProjectId = null;
      }
    }