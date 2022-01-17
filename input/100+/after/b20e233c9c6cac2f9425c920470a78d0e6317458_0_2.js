function contextualize (step, callbacks, context, ephemeral) {
      var inferred = !callbacks[0].names.length
        , names = (inferred ? step.parameters : callbacks[0].names).slice(0)
        , arrayed
        , i, $
        , vargs
        ;

      if (~(i = names.indexOf('cadence')) || ~(i = names.indexOf(options.alias))) {
        names.length = i;
      }
      if (callbacks.length == 1) {
        vargs = callbacks[0].vargs;
        for (i = names.length; i--;) {
          if (!names[i].indexOf('$vargs') && ($ = /^\$vargs(?:\$(\d+))?$/.exec(names[i]))) {
            ephemeral[names[i]] = vargs.splice(i, vargs.length - (i + +($[1] || 0)));
            names.splice(i, 1);
            break;
          }
        }
        names.length = callbacks[0].vargs.length;
        names.forEach(function (name, i) { (name[0] == '$' ? ephemeral : context)[name] = vargs[i] });
      } else if (names.length) {
        arrayed = callbacks.every(function (result) {
          return (
            result.vargs.length == names.length
            && ((inferred && !result.names.length)
                || names.every(function (name, i) { return name == result.names[i] }))
          );
        });
        if (arrayed) {
          names.length = callbacks[0].vargs.length;
          names.forEach(function (name, i) { (name[0] == '$' ? ephemeral : context)[name] = [] });
          callbacks.forEach(function (result) {
            result.vargs.forEach(function (arg, i) {
              (names[i][0] == '$' ? ephemeral : context)[names[i]].push(arg);
            });
          });
        } else {
          throw new Error("Can't infer array assignment.");
        }
      }
      return names;
    }