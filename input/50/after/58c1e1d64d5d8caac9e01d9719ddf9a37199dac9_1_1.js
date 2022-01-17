function() {
        var $devopt = $(".devopt");
        if(_this.clickEgg == 2) {
          _this.clickEgg = 0;
          $devopt.show();
        } else {
          $devopt.hide();
          _this.clickEgg ++;
        }
      }