function() {
      this.$projectList = $('<div id="projects">').appendTo('#sidebar');
      this.$screenList = $('<div id="screens">').appendTo('#content');

      projects.bind('add', this.addProject, this);
      projects.bind('reset', this.addAllProjects, this);

      // if the part of the URL after # is an existing project id, make the
      // corresponding project active initially
      var poundIndex = location.href.lastIndexOf('#');
      if (poundIndex !== -1) {
        this.initialProjectId = location.href.substring(poundIndex + 1);
        this.initialProjectId = parseInt(this.initialProjectId, 10);
      }

      // get all projects from server
      projects.fetch();

      screens.bind('add', this.addAllScreens, this);
      screens.bind('reset', this.addAllScreens, this);
      screens.bind('remove', this.addAllScreens, this);
    }