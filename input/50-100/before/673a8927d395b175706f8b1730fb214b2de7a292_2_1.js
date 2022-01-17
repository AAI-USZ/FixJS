function (req, res) {
      if (req.refresh && req.timeout)
        $.jGrowl('now the news should be reloaded');
      else if (req.refresh)
        $.jGrowl('the news are still fresh. no reload needed');
      else if (!req.refresh)
        $.jGrowl('creating the news');
      res.show('some news');
    }