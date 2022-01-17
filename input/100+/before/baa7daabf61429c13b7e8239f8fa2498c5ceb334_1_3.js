function generateActorKeyframes (actor, granularity) {
    var animLength = actor.getLength();
    var delay = actor.getStart();
    var serializedFrames = [];
    var percent, adjustedPercent, stepPrefix;
    var increment = animLength / granularity;
    var adjustedIncrement = Math.floor(increment);
    var animPercent = animLength / 100;
    var loopStart = delay + increment;
    var loopEnd = animLength + delay - increment;

    actor.updateState(delay);
    serializedFrames.push('  from ' + serializeActorStep(actor));

    var i;
    for (i = loopStart; i <= loopEnd; i += increment) {
      actor.updateState(i);
      percent = (i - delay) / animPercent;
      adjustedPercent = +percent.toFixed(2);
      stepPrefix = adjustedPercent + '% ';
      serializedFrames.push('  ' + stepPrefix + serializeActorStep(actor));
    }

    actor.updateState(animLength + delay);
    serializedFrames.push('  to ' + serializeActorStep(actor));

    return serializedFrames.join('\n');
  }