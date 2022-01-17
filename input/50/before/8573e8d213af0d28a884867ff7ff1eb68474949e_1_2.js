function(err, res) {
        if(err)
          sys.puts("error sending report to " + option.report);
        else
          sys.puts("saved report " + options.report + "/" + res.id);
      }