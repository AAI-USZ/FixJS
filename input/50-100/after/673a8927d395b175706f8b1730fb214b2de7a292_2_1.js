function (req, res) {
      if (req.pageExists && req.timeout) {
        $.jGrowl('now the news should be reloaded');
        num_reloads++;
        res.show('some news: '+num_reloads);
      } else if (req.pageExists) {
        $.jGrowl('the news are still fresh. no reload needed');
        res.show(true);
      } else if (!req.pageExists) {
        $.jGrowl('creating the news');
        res.show('some news');
      }
    }