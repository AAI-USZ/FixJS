function generateActorKeyframes (actor, granularity, track) {
    var serializedFrames = [];
    var actorEnd = actor.getEnd();
    var actorStart = actor.getStart();
    var actorLength = actor.getLength();
    var leadingWait = simulateLeadingWait(actor, track, actorStart);

    if (leadingWait) {
      serializedFrames.push(leadingWait);
    }

    _.each(actor._propertyTracks[track], function (prop, propName) {
      var fromPercent = calculateStepPercent(prop, actorStart, actorLength);
      var nextProp = prop.nextProperty;

      var toPercent;
      if (nextProp) {
        toPercent = calculateStepPercent(nextProp, actorStart, actorLength);
      } else {
        toPercent = 100;
      }

      var delta = toPercent - fromPercent;
      var increments = Math.floor((delta / 100) * granularity) || 1;
      var incrementSize = delta / increments;
      var trackSegment = generateActorTrackSegment(
          actor, prop, increments, incrementSize, actorStart, fromPercent);

      serializedFrames.push(trackSegment.join('\n'));
    });

    var trailingWait =
        simulateTrailingWait(actor, track, actorStart, actorEnd);

    if (trailingWait) {
      serializedFrames.push(trailingWait);
    }

    return serializedFrames.join('\n');
  }