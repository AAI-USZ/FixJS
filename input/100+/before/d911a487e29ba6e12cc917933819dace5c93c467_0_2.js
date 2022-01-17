function(data, status, xhr) {
          var entry, next, _i, _len, _ref;
          if (data.meta.status !== 200) {
            $("#spinner").spin(false);
            $("tbody:first").fadeOut('slow').empty();
            $("header p").html("User not found.");
            return;
          }
          allRepos = allRepos.concat(data.data);
          if (data.meta['Link']) {
            _ref = data.meta['Link'];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entry = _ref[_i];
              if (entry[1]['rel'] === 'next') {
                next = entry[0];
              }
            }
          }
          if (next) {
            return get_repo(next);
          } else {
            return render_table(allRepos, user);
          }
        }