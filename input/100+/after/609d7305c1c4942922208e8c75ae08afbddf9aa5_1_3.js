function generateActorTrackSegment (
      actor, fromProp, increments, incrementSize, actorStart, fromPercent) {

    var accumulator = [];
    var actorLength = actor.getLength();

    var i, adjustedPercent, stepPrefix;
    for (i = 0; i < increments; i++) {
      adjustedPercent = fromPercent + (i * incrementSize);
      actor.updateState(
          ((adjustedPercent / 100) * actorLength) + actorStart);
      stepPrefix = +adjustedPercent.toFixed(2) + '% ';
      accumulator.push(
          '  ' + stepPrefix + serializeActorStep(actor, fromProp.name));
    }

    return accumulator;
  }