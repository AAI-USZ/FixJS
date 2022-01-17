function(data, status, xhr) {
          var next, _i, _len, _ref;
          allRepos = allRepos.concat(data.data);
          _ref = data.meta;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            next = _ref[_i];
            if (next[1]['rel'] === 'next') {
              next = next[0];
            }
          }
          if (next) {
            return get_repo(next[0]);
          } else {
            return render_table(allRepos, user);
          }
        }