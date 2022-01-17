function(err, res) {
        if(err)
          util.puts("error sending report to " + option.report);
        else
          util.puts("saved report " + options.report + "/" + res.id);
      }