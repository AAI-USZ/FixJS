function(e) { // trigger on select change
      var target = e.target;
      that.runAction(target.className, target);
      return false;
    }).click(function(e){return false; }