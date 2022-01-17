function(slug) {
    var ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "gov-watch.iced",
        funcname: "update_history"
      });
      setTimeout((__iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return __iced_deferrals.ret = arguments[0];
          };
        })(),
        lineno: 58
      })), 0);
      __iced_deferrals._fulfill();
    })(function() {
      return window.location.hash = generate_hash(selected_book, search_term, slug);
    });
  }