function(vendor){
      // keyframes
      // TODO: better clone...
      var clone = cssom.parse(rule.cssText).cssRules[0];
      clone._vendorPrefix = vendor;

      // prefix properties
      clone.cssRules = clone.cssRules.map(function(rule){
        self.applyPrefixes(rule, { only: vendor });
        return rule;
      });

      style.insertRule(clone.cssText, i + 1);
    }