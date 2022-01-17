function (html, no_handle) {
          self.loading--; // this ensures that if you started loading a new page while already loading a page, the loading animation isn't stopped on the first page that finishes but on the last one.
          if (self.loading < 1) {
            self.loading = 0; // just to be sure this doesn't somehow fall below zero
            self.trigger('page_loading_done');
          }
          if ( ! no_handle) {
            self.breadcrumb(controller, action, parameters);
            self.replacePage($pageDiv, html, controller, action);
            if ( ! pageExists || timeout ) {
              $pageDiv.data('lastLoad', now);
            }
          }
        }