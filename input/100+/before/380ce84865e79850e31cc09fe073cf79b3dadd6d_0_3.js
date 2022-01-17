function(_super) {

      __extends(App, _super);

      function App() {
        return App.__super__.constructor.apply(this, arguments);
      }

      App.prototype.initialize = function() {
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
        $(window).bind('scroll touchmove', function() {
          return _this.vent.trigger('scroll:window');
        });
        app.vent.on('task:check', this.check, this);
        app.vent.on('task:uncheck', this.uncheck, this);
        app.vent.on('task:clicked', this.showTask, this);
        app.vent.on('settings:clicked', this.showSettings, this);
        return app.vent.on('home:clicked', this.showTasks, this);
      };

      App.prototype.showApp = function() {
        this.addRegions({
          navigation: '.navigation',
          flash: '.flash',
          body: '.body'
        });
        return this.navigation.show(this.navBar);
      };

      App.prototype.showTasks = function() {
        this.router.navigate('');
        return this.body.show(this.tasksView = new TasksView({
          collection: this.tasks
        }));
      };

      App.prototype.showSettings = function() {
        this.router.navigate('settings');
        return this.body.show(this.settingsView = new SettingsView({
          model: this.user
        }));
      };

      App.prototype.showTask = function(task) {
        this.router.navigate("task/" + task.id);
        if (!_.isObject(task)) {
          task = this.tasks.get(task);
        }
        return this.body.show(this.taskView = new TaskView({
          model: task
        }));
      };

      App.prototype.showError = function(message) {
        return this.flash.show(this.error = new ErrorView({
          message: message
        }));
      };

      return App;

    }