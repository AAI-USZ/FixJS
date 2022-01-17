function() {
    
    if (!this.get('hasFocus')) {
      SC.$('body').addClass('sc-focus').removeClass('sc-blur');

      // If the app is getting focus again set the first responder to the first
      // valid firstResponder view in the view's tree
      var mainPane = this.get('mainPane');

      if(!SC.TABBING_ONLY_INSIDE_DOCUMENT && mainPane){
        var nextValidKeyView = mainPane.get('nextValidKeyView');

        if (nextValidKeyView) mainPane.makeFirstResponder(nextValidKeyView);
      }
      
      SC.run(function() {
        this.set('hasFocus', YES);
      }, this);
    }
    return YES ; // allow default
  }