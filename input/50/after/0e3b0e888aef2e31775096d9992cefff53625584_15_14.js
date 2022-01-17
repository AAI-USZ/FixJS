function(rule){
        rule.isAllowed(addOptions({url:'http://google.com', ip:'10.69.2.13'}), _w(this.callback));
      }