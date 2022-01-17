function(e) {
      var data, hash, updater, updaters, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      hash = window.location.hash;
      hash = hash.slice(1, hash.length + 1 || 9e9);
      $("#saver").attr("action", "/update/" + hash);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "update-issue.iced",
          funcname: "onhashchange"
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
      })(function() {
        var _i, _len;
        updaters = data['updates'];
        updaters = Object.keys(updaters);
        $("#updaters ul").html('<li>ארגון חדש</li>');
        for (_i = 0, _len = updaters.length; _i < _len; _i++) {
          updater = updaters[_i];
          $("#updaters ul").append("<li>" + updater + "</li>");
        }
        $('#updaters li').click(function() {
          var username;
          $("#updaters").modal('hide');
          username = $(this).html();
          J.setvalue(data['updates'][username][0]);
          $("#body").html("");
          return J.render();
        });
        return $("#updaters").modal('show');
      });
    }