function() {
    var data, item, ___iced_passed_deferral, __iced_deferrals,
      _this = this;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
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
    })(function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        _results.push($("#list").append("<div class='row'>                                         <div class='span7' style='color:white;'>" + item['base']['subject'] + "</div>                                         <a href='/edit#" + item.slug + "' class='span2 btn btn-small btn-primary'>עריכת נתוני בסיס</a>                                         <a href='/update#" + item.slug + "' class='span1 btn btn-small btn-primary'>עדכון סטטוס</a>                                   </div>"));
      }
      return _results;
    });
  }