function(project) {
      var view = new ProjectView({
        model: project,
        screens: screens
      });
      this.$projectList.append(view.render().$el);
    }