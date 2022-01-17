function(e) {
      var data, hash, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      hash = window.location.hash;
      hash = hash.slice(1, hash.length + 1 || 9e9);
      $("#saver").attr("action", "/base/" + hash);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "edit-issue.iced",
          funcname: "onhashchange"
        });
        $.getJSON("/api/" + hash, (__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return data = arguments[0];
            };
          })(),
          lineno: 23
        })));
        __iced_deferrals._fulfill();
      })(function() {
        J.setvalue(data['base']);
        $("#body").html("");
        return J.render();
      });
    }