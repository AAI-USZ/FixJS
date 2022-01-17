function(rule){
        rule.isAllowed({domain:'google.com', username:'other'}, _w(this.callback));
      }