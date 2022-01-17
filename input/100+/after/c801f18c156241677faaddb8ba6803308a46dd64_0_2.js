function() {
      var p, rel, _i, _len, _ref;
      if ($(this).hasClass("commentcount")) go_to_comments = true;
      rel = $(this).attr('rel');
      if (!rel) {
        _ref = $(this).parents();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          rel = $(p).attr('rel');
          if (rel) break;
        }
      }
      update_history(rel);
      return false;
    }