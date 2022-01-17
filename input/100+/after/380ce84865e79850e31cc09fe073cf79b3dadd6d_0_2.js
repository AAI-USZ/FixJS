function() {
        var _this = this;
        this.user = new User;
        this.tasks = new Tasks;
        if (window.bootstrap.user != null) {
          this.user.set(window.bootstrap.user);
        }
        if (window.bootstrap.tasks != null) {
          this.tasks.reset(window.bootstrap.tasks);
        }
        this.navBar = new NavBarView({
          model: this.user
        });
        this.tasksView = new TasksView({
          collection: this.tasks
        });
        this.settingsView = new SettingsView({
          model: this.user
        });
        this.showApp();
        this.router = new AppRouter({
          controller: this
        });
        Backbone.history.start({
          pushState: true
        });
        $(document).ajaxError(function(e, xhr, settings, error) {
          switch (xhr.status) {
            case 401:
              return app.vent.trigger('error', 'Authentication error, try logging in again.');
            case 404:
              return app.vent.trigger('error', 'The server didn\'t understand that action.');
            case 500:
              return app.vent.trigger('error', 'There was a server error, try again.');
          }
        });
        $(window).bind('scroll touchmove', function() {
          return _this.vent.trigger('scroll:window');
        });
        app.vent.on('task:check', this.check, this);
        app.vent.on('task:uncheck', this.uncheck, this);
        app.vent.on('error', this.showError, this);
        app.vent.on('task:clicked', this.showTask, this);
        app.vent.on('task:delete', this.deleteTask, this);
        app.vent.on('settings:clicked', this.showSettings, this);
        return app.vent.on('home:clicked', this.showTasks, this);
      }