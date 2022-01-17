function() {
      this.$projectList = $('<div id="projects">').appendTo('#sidebar');
      this.$screenList = $('<div id="screens">').appendTo('#content');

      projects.bind('add', this.addProject, this);
      projects.bind('reset', this.addAllProjects, this);
      projects.fetch(); // get all projects from server

      screens.bind('add', this.addAllScreens, this);
      screens.bind('reset', this.addAllScreens, this);
      screens.bind('remove', this.addAllScreens, this);
    }