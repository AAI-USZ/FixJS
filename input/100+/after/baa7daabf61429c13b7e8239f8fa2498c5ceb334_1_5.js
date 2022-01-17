function serializeActorStep (actor, targetProp) {
    var serializedProps = ['{'];

    var propsToSerialize;
    if (targetProp) {
      propsToSerialize = {};

      var currentPropState = actor.get()[targetProp];
      if (typeof currentPropState !== 'undefined') {
        propsToSerialize[targetProp] = currentPropState;
      }
    } else {
      propsToSerialize = actor.get();
    }

    var printVal;
    _.each(propsToSerialize, function (val, key) {
      printVal = val;
      var printKey = key;

      if (key === 'transform') {
        printKey = TRANSFORM_TOKEN;
      }

      serializedProps.push(printKey + ':' + printVal + ';');
    });

    serializedProps.push('}');
    return serializedProps.join('');
  }