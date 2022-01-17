function(json) {
          var repos = [];

          if (!json) { return; }
          for (var i = 0; i < json.data.length; i++) {
            if (options.skip_forks && json.data[i].fork) { continue; }
            repos.push(json.data[i]);
          }
          repos.sort(function(a, b) {
            var aDate = new Date(a.pushed_at).valueOf(),
                bDate = new Date(b.pushed_at).valueOf();

            if (aDate === bDate) { return 0; }
            return aDate > bDate ? -1 : 1;
          });

          if (options.count) { repos.splice(options.count); }
          render(options.target, repos);
        }