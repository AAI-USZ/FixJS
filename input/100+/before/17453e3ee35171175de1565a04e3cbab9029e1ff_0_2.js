function(project, lastCommit) {
      if (opts.debug)
        console.log(data);
      
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
            .html(lastCommit.message)
            .attr('href', 'http://github.com'+lastCommit.url)
            .end()
          .find('.repo-commit-date span')
            .html(relativeDate(lastCommit.committed_date))
            .end();

        var el = $(item);
        el.html(tmpl);
      
      });
    }