function ($target) {
      var $tip = methods.getTip($target);
      if ($tip && $tip.length > 0) {
        methods.show($target);
      } else {
        methods.create($target);
      }
    }