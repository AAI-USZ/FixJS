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
        this.daysInView = 6;
        this.offset = 0;
        this.navBar = new NavBarView({
          model: this.user
        });
        this.tasksView = new TasksView({
          collection: this.tasks
        });
        this.settingsView = new SettingsView({
          model: this.user
        });
        this.toggleWidth();
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
              return _this.vent.trigger('error', 'Authentication error, try logging in again.');
            case 404:
              return _this.vent.trigger('error', 'The server didn\'t understand that action.');
            case 500:
              return _this.vent.trigger('error', 'There was a server error, try again.');
          }
        });
        $(window).bind('scroll touchmove', function() {
          return _this.vent.trigger('scroll:window');
        });
        $(window).bind('resize', function() {
          return _this.toggleWidth();
        });
        $(window).bind('keyup', function(e) {
          var key, _ref;
          key = (_ref = e.which) != null ? _ref : e.keyCode;
          switch (key) {
            case 37:
              return _this.vent.trigger('app:moveBackward');
            case 39:
              return _this.vent.trigger('app:moveForward');
          }
        });
        app.vent.on('task:check', this.check, this);
        app.vent.on('task:uncheck', this.uncheck, this);
        app.vent.on('error', this.showError, this);
        app.vent.on('notice', this.showNotice, this);
        app.vent.on('task:clicked', this.showTask, this);
        app.vent.on('task:delete', this.deleteTask, this);
        app.vent.on('settings:clicked', this.showSettings, this);
        app.vent.on('home:clicked', this.showTasks, this);
        app.vent.on('app:moveForward', this.moveForward, this);
        return app.vent.on('app:moveBackward', this.moveBackward, this);
      };

      App.prototype.toggleWidth = function() {
        var old;
        old = this.daysInView;
        this.daysInView = $(window).width() <= 480 ? 1 : 6;
        if (this.daysInView !== old) {
          return app.vent.trigger('window:resize');
        }
      };

      App.prototype.showApp = function() {
        var _this = this;
        this.addRegions({
          navigation: '.navigation',
          body: '.body'
        });
        this.flash = new MultiRegion({
          el: '.flash'
        });
        this.navigation.show(this.navBar);
        return $(this.body.el).hammer().bind('swipe', function(ev) {
          switch (ev.direction) {
            case 'left':
              return _this.vent.trigger('app:moveForward');
            case 'right':
              return _this.vent.trigger('app:moveBackward');
          }
        });
      };

      App.prototype.showTasks = function() {
        this.offset = 0;
        this.router.navigate('');
        this.navBar.showArrows();
        return this.body.show(this.tasksView = new TasksView({
          collection: this.tasks
        }));
      };

      App.prototype.showSettings = function() {
        this.router.navigate('settings');
        this.navBar.hideArrows();
        this.body.show(this.settingsView = new SettingsView);
        this.settingsView.info.show(this.infoForm = new InfoForm({
          model: this.user
        }));
        return this.settingsView.password.show(this.passwordForm = new PasswordForm);
      };

      App.prototype.showTask = function(id) {
        var task;
        task = this.tasks.get(id);
        if (task == null) {
          this.showTasks();
          return this.showError('That task doesn\'t exist.');
        } else {
          this.router.navigate("task/" + task.id);
          this.navBar.hideArrows();
          return this.body.show(this.taskView = new TaskView({
            model: task
          }));
        }
      };

      App.prototype.deleteTask = function(id) {
        var _this = this;
        return this.tasks.get(id).destroy({
          success: function() {
            $(".deleteModal").modal('hide');
            return _this.showTasks();
          }
        });
      };

      App.prototype.showError = function(message) {
        var error;
        return this.flash.append(error = new ErrorView({
          message: message
        }));
      };

      App.prototype.showNotice = function(message) {
        var notice,
          _this = this;
        this.flash.append(notice = new NoticeView({
          message: message
        }));
        return window.setTimeout((function() {
          return notice.$(".alert").alert('close');
        }), 2000);
      };

      App.prototype.hideErrors = function() {
        return this.flash.close();
      };

      App.prototype.moveForward = function() {
        if (this.offset !== 0) {
          if (this.daysInView === 1) {
            this.offset += 1;
          } else {
            this.offset += 7;
          }
          return this.vent.trigger('app:changeOffset');
        }
      };

      App.prototype.moveBackward = function() {
        if (this.daysInView === 1) {
          this.offset -= 1;
        } else {
          this.offset -= 7;
        }
        return this.vent.trigger('app:changeOffset');
      };

      return App;

    }