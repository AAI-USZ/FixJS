function generateBoilerplatedKeyframes (
      actor, animName, granularity, opt_vendors) {

    var trackNames = _.keys(actor._propertyTracks);
    var trackNames = actor.getTrackNames();
    var cssTracks = [];

    _.each(trackNames, function (trackName) {
      cssTracks.push(
        generateActorKeyframes(actor, granularity, trackName));
    });

    var boilerplatedKeyframes = [];

    _.each(trackNames, function (trackName, i) {
      boilerplatedKeyframes.push(applyVendorBoilerplates(
        cssTracks[i], (animName + '-' + trackName), opt_vendors));
    });

    boilerplatedKeyframes = boilerplatedKeyframes.join('\n');

    return boilerplatedKeyframes;
  }