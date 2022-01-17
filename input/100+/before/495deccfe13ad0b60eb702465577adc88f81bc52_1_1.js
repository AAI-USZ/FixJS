function canOptimizeKeyframeProperty (property) {
    if (property.nextProperty) {
      return !!(BEZIERS[property.nextProperty.easing]);
    } else {
      return false;
    }
  }