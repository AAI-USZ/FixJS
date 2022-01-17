function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: 'edit-list.iced'
      });
      $.getJSON("/api", (__iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return data = arguments[0];
          };
        })(),
        lineno: 1
      })));
      __iced_deferrals._fulfill();
    }