function(sprites, spriteId){
      var selectors = [];
      forEach(sprites.images, function(def, img){
        selectors = selectors.concat(multSelector[img]);
      });

      var rule = {
        'selector': selectors,
        'property': ['background-image', 'background-repeat'],
        'value': ['url(' + sprites['filename'] + ')!important', 'no-repeat']
      };
      if (!sprites.force8bit){
        rule.property.push('_background-image');
        rule.value.push(rule.value[0].replace(spriteId, spriteId + '-ie6'));
      }
      _this.writeRule(rule, true);
    }