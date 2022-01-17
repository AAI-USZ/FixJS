function(rule){
        rule.isAllowed(addOptions({url:'http://google.com', username:'felix'}), _w(this.callback));
      }