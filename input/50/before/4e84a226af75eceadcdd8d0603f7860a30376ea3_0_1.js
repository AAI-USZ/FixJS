function(source) {
      var target;
      target = {};
      args.unshift(target);
      balUtilFlow.extend(target, source);
      return target;
    }