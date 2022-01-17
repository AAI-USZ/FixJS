function(rule){
        rule.isAllowed(addOptions({url:'http://google.com', username:'other'}), _w(this.callback));
      }