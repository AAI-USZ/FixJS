function generateActorKeyframes (actor, granularity, track) {
    var serializedFrames = [];
    var actorEnd = actor.getEnd();
    var actorStart = actor.getStart();

    _.each(actor._propertyTracks[track], function (prop, propName) {
      var fromPercent =
          ((prop.millisecond - actorStart) / actor.getLength()) * 100;
      var nextProp = prop.nextProperty;
      var toPercent;
      if (nextProp) {
        toPercent =
          ((nextProp.millisecond - actorStart) / actor.getLength()) * 100;
      } else {
        toPercent = 100;
      }

      var delta = toPercent - fromPercent;
      var increments = Math.floor((delta / 100) * granularity) || 1;
      var incrementSize = delta / increments;
      var trackSegment = generateActorTrackSegment(
          actor, prop, increments, incrementSize, fromPercent);

      serializedFrames.push(trackSegment.join('\n'));
    });

    return serializedFrames.join('\n');
  }