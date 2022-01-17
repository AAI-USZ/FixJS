function() {
      var suffix, num = this.abs(), last = parseInt(num.toString().slice(-2));
      if(last >= 11 && last <= 13) {
        suffix = 'th';
      } else {
        switch(num % 10) {
          case 1:  suffix = 'st'; break;
          case 2:  suffix = 'nd'; break;
          case 3:  suffix = 'rd'; break;
          default: suffix = 'th';
        }
      }
      return this.toString() + suffix;
    }