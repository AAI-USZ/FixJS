function(selector) {
    $("" + selector + " .commentcount").each(function() {
      var h, json, slug, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      slug = $(this).attr('rel');
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "gov-watch.iced"
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
      })(function() {
        h = $(_this).html();
        try {
          return $(_this).html(json[0].commentsbox_count + h);
        } catch (error) {
          return console.log("Failed tp parse json:", JSON.stringify(json));
        }
      });
    });
    if (selector === ".item") {
      return $("#items").isotope('updateSortData', $(".item"));
    }
  }