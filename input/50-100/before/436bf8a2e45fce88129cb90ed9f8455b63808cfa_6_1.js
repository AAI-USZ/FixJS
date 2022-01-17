function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'update-issue.iced',
          funcname: 'onhashchange'
        });
        $.getJSON("/api/" + hash, (__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return data = arguments[0];
            };
          })(),
          lineno: 25
        })));
        __iced_deferrals._fulfill();
      }