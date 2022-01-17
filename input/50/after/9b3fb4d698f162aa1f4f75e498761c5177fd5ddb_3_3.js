function () {
           var selfWpPoolView = this;
           this.phoneNumbersPool.each(function (wp) {
              selfWpPoolView.appendWorkingPoint(wp);
           });            
        }