function() {
    var current_version, version, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    try {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "gov-watch.iced"
        });
        $.get("/api/version", (__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return version = arguments[0];
            };
          })(),
          lineno: 979
        })), "json");
        __iced_deferrals._fulfill();
      })(function() {
        try {
          current_version = localStorage.version;
          if (current_version && version === JSON.parse(current_version)) {
            loaded_data = JSON.parse(localStorage.data);
            all_books = JSON.parse(localStorage.all_books);
            all_tags = JSON.parse(localStorage.all_tags);
            all_people = JSON.parse(localStorage.all_people);
            all_subjects = JSON.parse(localStorage.all_subjects);
            process_data();
            return localStorage.version = JSON.stringify(version);
          } else {
            console.log("wrong version " + current_version + " != " + version);
            return load_data();
          }
        } catch (error) {
          console.log("failed to load data from storage: " + error);
          return load_data();
        }
      });
    } catch (error) {
      return load_data();
    }
  }