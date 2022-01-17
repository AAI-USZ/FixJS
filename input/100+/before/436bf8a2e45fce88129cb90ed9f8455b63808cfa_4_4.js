function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: 'gov-watch.iced'
        });
        $.get('https://api.facebook.com/method/fql.query', {
          query: "SELECT url,commentsbox_count FROM link_stat WHERE url='" + (generate_url(slug)) + "'",
          format: "json"
        }, (__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return json = arguments[0];
            };
          })(),
          lineno: 915
        })), "json");
        __iced_deferrals._fulfill();
      }