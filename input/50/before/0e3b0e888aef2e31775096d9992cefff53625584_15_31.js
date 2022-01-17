function(rule){
        rule.isAllowed({domain:'hotmail.com', username: 'other'}, _w(this.callback));
      }