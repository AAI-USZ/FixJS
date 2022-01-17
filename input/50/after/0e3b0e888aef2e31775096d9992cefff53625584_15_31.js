function(rule){
        rule.isAllowed(addOptions({url:'http://hotmail.com', username: 'other'}), _w(this.callback));
      }