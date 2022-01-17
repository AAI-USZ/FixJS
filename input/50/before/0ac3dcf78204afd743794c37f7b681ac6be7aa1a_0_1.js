function(o){
      try {
        o.result = testResults[o.group][o.name];
      } catch(e){
        o.result = "OK|No Results";
      }
    }