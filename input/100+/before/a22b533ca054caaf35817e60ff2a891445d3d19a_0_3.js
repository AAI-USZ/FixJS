function generateActorTrackSegment (
      actor, fromProp, increments, incrementSize, fromPercent) {

    var serializedFrames = [];
    var i, adjustedPercent, stepPrefix;
    for (i = 0; i < increments; i++) {
      adjustedPercent = fromPercent + (i * incrementSize);
      actor.updateState( (adjustedPercent / 100) * actor.getLength() );
      stepPrefix = +adjustedPercent.toFixed(2) + '% ';
      serializedFrames.push(
          '  ' + stepPrefix + serializeActorStep(actor, fromProp.name));
    }

    return serializedFrames;
  }