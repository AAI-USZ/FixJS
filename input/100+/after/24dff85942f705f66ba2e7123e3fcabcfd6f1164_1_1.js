function() {
      var self = this;
      /* HACKS */
      function setPath(data, next) {
        document.body.setAttribute('data-path', data.canonicalPath);
        next();
      }

      // quick hack for today button
      var today = document.querySelector('#view-selector .today');

      today.addEventListener('click', function() {
        self.view('Month').render();
        self.timeController.setSelectedDay(new Date());
      });


      function tempView(selector) {
        self._views[selector] = new Calendar.View(selector);
        return selector;
      }

      /* temp views */
      this.state('/day/', setPath, tempView('#day-view'));
      this.state('/week/', setPath, tempView('#week-view'));
      this.state('/add/', setPath, tempView('#add-event-view'));


      /* routes */

      this.state('/month/', setPath, 'Month', 'MonthsDay');
      this.modifier('/settings/', setPath, 'Settings', { clear: false });
      this.modifier(
        '/advanced-settings/', setPath, 'AdvancedSettings'
      );

      this.modifier('/select-preset/', setPath, 'CreateAccount');
      this.modifier('/create-account/:preset', setPath, 'ModifyAccount');
      this.modifier('/update-account/:id', setPath, 'ModifyAccount');

      // I am not sure where this logic really belongs...
      this.modifier('/remove-account/:id', function(data) {
        var store = self.store('Account');
        store.remove(data.params.id, function(id) {
          page.replace('/advanced-settings/');
        });
      });

      var pathname = window.location.pathname;
      // default view
      if (pathname === '/index.html' || pathname === '/') {
        this.go('/month/');
      }

      this.syncController.observe();
      this.router.start();
      document.body.classList.remove('loading');
    }