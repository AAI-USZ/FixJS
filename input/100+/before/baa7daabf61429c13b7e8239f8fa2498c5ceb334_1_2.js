function generateCSSAnimationProperties (actor, animName, vendor) {
    var generatedProperties = [];
    var prefix = VENDOR_PREFIXES[vendor];
    var start = actor.getStart();
    var duration = actor.getEnd() - start;

    var animationName = printf('  %sanimation-name: %s;'
        ,[prefix, animName + '-keyframes']);
    generatedProperties.push(animationName);

    duration = printf('  %sanimation-duration: %sms;'
        ,[prefix, duration]);
    generatedProperties.push(duration);

    var delay = printf('  %sanimation-delay: %sms;', [prefix, start]);
    generatedProperties.push(delay);

    var fillMode = printf('  %sanimation-fill-mode: forwards;', [prefix]);
    generatedProperties.push(fillMode);

    return generatedProperties.join('\n');
  }