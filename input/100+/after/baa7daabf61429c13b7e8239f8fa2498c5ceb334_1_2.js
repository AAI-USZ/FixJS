function generateCSSAnimationProperties (actor, animName, vendor) {
    var generatedProperties = [];
    var prefix = VENDOR_PREFIXES[vendor];

    generatedProperties.push(generateAnimationNameProperty(
          actor, animName, prefix));
    generatedProperties.push(
        generateAnimationDurationProperty(actor, prefix));
    generatedProperties.push(generateAnimationDelayProperty(actor, prefix));
    generatedProperties.push(generateAnimationFillModeProperty(prefix));

    return generatedProperties.join('\n');
  }