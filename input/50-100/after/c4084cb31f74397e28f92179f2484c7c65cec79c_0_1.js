function(err, ls) {
      if(err) abort(err.message+'. Sorry.');
      if(ls.length == 0) abort('No builds installed, yet.');
      
      // display all versions
      ls.forEach(function(version) {
        var del = (version == current) ? '> ' : '  ';// highlight current
        console.log(del+version);
      });
      exit();
    }