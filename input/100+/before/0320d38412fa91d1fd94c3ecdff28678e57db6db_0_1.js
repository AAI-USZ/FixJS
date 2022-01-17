function(repos) {

        var i = 0;

        for (; i < repos.length; i++) {

          var html = reposItemTpl(repos[i]);

          reposContainer.append(html);

        }

      }