function () {
           var self = this;
           this.phoneNumbersPool.each(function (wp) {
              self.appendWorkingPoint(wp);
           });            
        }