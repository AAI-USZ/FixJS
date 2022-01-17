function generateBoilerplatedKeyframes (
      actor, animName, granularity, opt_vendors) {

    var trackNames = _.keys(actor._propertyTracks);
    var trackNames = actor.getTrackNames();
    var optimizedEasingFormula = getOptimizedEasingFormula(actor);
    var cssTracks = [];

    // TODO: CSS optimization is _extremely_ incomplete.  It only supports
    // single-step animations with one keyframe property.
    if (typeof optimizedEasingFormula === 'string') {
      cssTracks = [generateOptimizedKeyframes(actor, optimizedEasingFormula)];
    } else {
      _.each(trackNames, function (trackName) {
        cssTracks.push(
          generateActorKeyframes(actor, granularity, trackName));
      });
    }

    var boilerplatedKeyframes = [];

    _.each(trackNames, function (trackName, i) {
      boilerplatedKeyframes.push(applyVendorBoilerplates(
        cssTracks[i], (animName + '-' + trackName), opt_vendors));
    });

    boilerplatedKeyframes = boilerplatedKeyframes.join('\n');

    return boilerplatedKeyframes;
  }