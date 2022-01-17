function(route){
    var controller = 'main',
        action = 'index',
        parameters = [],
        refresh = false,
        timeout = false,
        now = +new Date(),
        $pageDiv,
        self = this;
    
    this.currentRoute = route; // for reloading
    
    if (route !== '') {
      route = route.split('/');
      controller = route[0].toLowerCase();
      if (route.length > 1 && route[1])
        action = route[1].toLowerCase();
      if (route.length > 2) {
        route.splice(0, 2);
        parameters = route;
      }
    }
    
    $pageDiv = $('#page_'+controller+'_'+action);
    if ($pageDiv.length === 0) {
      $pageDiv = $('<div/>', {
        id: 'page_'+controller+'_'+action,
        'data-lastLoad': now
      }).appendTo(this.config.$content);
    } else {
      refresh = true;
      timeout = $pageDiv.data('lastLoad')+this.config.pageTimeout < now;
    }
    
    try {
      var req = {
        params: parameters,
        $context: $pageDiv,
        refresh: refresh,
        timeout: timeout
      }, 
      res = {
        show: function (html, no_handle) {
          self.loading--; // this ensures that if you started loading a new page while already loading a page, the loading animation isn't stopped on the first page that finishes but on the last one.
          if (self.loading < 1) {
            self.loading = 0; // just to be sure ;D
            self.trigger('page_loading_done');
          }
          if ( ! no_handle) {
            self.breadcrumb(controller, action, parameters);
            self.replacePage($pageDiv, html, controller, action);
            $pageDiv.data('lastLoad', now);
          }
        }
      };
      this.controllers[controller][action].call(this, req, res);
      this.loading++;
      self.trigger('page_loading_start');
    } catch(e) {
      $.jGrowl('Sorry, there was an error while trying to process your action');
      console.log(e);
    }
  }