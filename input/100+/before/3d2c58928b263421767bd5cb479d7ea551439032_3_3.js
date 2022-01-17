function(sprites, spriteId){
      var selectors = [];
      forEach(sprites.images, function(def, img){
        selectors = selectors.concat(multSelector[img]);
      });

      _this.writeRule({
        'selector': selectors,
        'property': ['background-image', 'background-repeat'],
        'value': ['url(' + sprites['filename'] + ')', 'no-repeat']
      }, true);
    }