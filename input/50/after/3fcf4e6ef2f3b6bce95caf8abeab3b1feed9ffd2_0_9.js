function(e) { // trigger on select change
      var target = e.target;
      that.runAction(editor, target.className, target);
      return false;
    }).click(function(e){return false; }