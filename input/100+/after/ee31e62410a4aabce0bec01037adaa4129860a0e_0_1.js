function(typ) {
      // update partials sliding window
      var empty = [];
      for(var st in my.prts[typ]) {
        // we base ourselves only on dirtiness since timers can be a
        // little off due to garbage collection 
        while(my.prts[typ][st].length > 0 && 
              !my.prts[typ][st][0].drt) {
          my.prts[typ][st].splice(0,1);
          //console.log('REMOVED ' + typ + ' ' + st);
        }
        if(my.prts[typ][st].length === 0)
          empty.push(st);
      }
      empty.forEach(function(st) {
        delete my.prts[typ][st];
      });
    }