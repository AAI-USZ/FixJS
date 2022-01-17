function(typ) {
      // update partials sliding window
      var empty = [];
      for(var st in my.prts[typ]) {
        while(my.prts[typ][st].length > 0 && 
              !my.prts[typ][st][0].drt &&
              (now - my.prts[typ][st][0].rcv) > my.cfg['DATTSS_USER_CROND_PERIOD']) {
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