function(rule){
        rule.isAllowed(addOptions({url:'http://google.com', username:'phil'}), _w(this.callback));
      }