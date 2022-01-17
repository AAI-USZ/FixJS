function(project, lastCommit) {
      if (opts.debug) {
        console.log(arguments);
      }
      
      self.each(function(i, item) {
        var tmpl = $(opts.template);
        tmpl
          .find('.repo-lang')
            .html(project.language)
            .end()
          .find('.repo-watchers')
            .html(project.watchers)
            .attr('href', project.html_url)
            .end()
          .find('.repo-forks')
            .html(project.forks)
            .attr('href', project.html_url)
            .end()
          .find('.repo-name')
            .html(project.name)
            .attr('href', project.html_url)
            .end()
          .find('.repo-commit-message')
            .html(lastCommit.commit.message)
            .attr('href', 'http://github.com'+lastCommit.url)
            .end()
          .find('.repo-commit-date span')
            .html(relativeDate(lastCommit.commit.committer.date))
            .end();

        var el = $(item);
        el.html(tmpl);
        el.trigger('render');
      
      });
    }