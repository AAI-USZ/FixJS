function(rule){
        rule.isAllowed({domain:'google.com', ip: '10.168.1.55'}, _w(this.callback));
      }