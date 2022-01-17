function(rule, i){
    newstyle.insertRule(rule.cssText, i);

    if (8 != rule.type) return;

    prefixes.forEach(function(vendor){
      // keyframes
      // TODO: better clone...
      var clone = cssom.parse(rule.cssText).cssRules[0];
      clone._vendorPrefix = vendor;

      // prefix properties
      clone.cssRules = clone.cssRules.map(function(rule){
        self.applyPrefixes(rule, { only: vendor });
        return rule;
      });

      newstyle.insertRule(clone.cssText, i);
    });
  }