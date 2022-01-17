function(context, firstTime) {
    sc_super() ;
    var v, accessoryViewWidths, leftAdjustment, rightAdjustment;

    // always have at least an empty string
    v = this.get('fieldValue');
    if (SC.none(v)) v = '';
    v = String(v);
    // update layer classes always
    if (v.length > 0) {
      context.setClass('not-empty', YES);
    } else {
      context.removeClass('not-empty');
    }
    
    if (this.get('isEditable')) {
      context.removeClass('readonly');
    } else {
      context.setClass('readonly', YES);
    }

    // If we have accessory views, we'll want to update the padding on the
    // hint to compensate for the width of the accessory view.  (It'd be nice
    // if we could add in the original padding, too, but there's no efficient
    // way to do that without first rendering the element somewhere on/off-
    // screen, and we don't want to take the performance hit.)
    accessoryViewWidths = this._getAccessoryViewWidths() ;
    leftAdjustment  = accessoryViewWidths['left'] ;
    rightAdjustment = accessoryViewWidths['right'] ;

    if (leftAdjustment)  leftAdjustment  += 'px' ;
    if (rightAdjustment) rightAdjustment += 'px' ;

   this._renderField(context, firstTime, v, leftAdjustment, rightAdjustment) ;
    if(SC.browser.mozilla) this.invokeLast(this._applyFirefoxCursorFix);
  }