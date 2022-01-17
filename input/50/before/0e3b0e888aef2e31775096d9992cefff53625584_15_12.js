function(rule){
        rule.isAllowed({domain:'google.com', url:'https://www.google.at/search?q=flv'}, _w(this.callback));
      }