function(rule){
        rule.isAllowed(addOptions({url:'http://google.com', ip: '10.168.1.55'}), _w(this.callback));
      }