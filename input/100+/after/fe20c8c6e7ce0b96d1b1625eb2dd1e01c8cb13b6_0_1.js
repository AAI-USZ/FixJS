function( new_value ) {
    var self            = this
      , o               = this.options
      , current_value   = $( ':selected' , this.element ).val()
      , has_new_element = this.items.filter('[rel="' + new_value + '"]').length > 0
      , new_element
    ;

    if( new_value && has_new_element ) {
      new_element = this.items.filter('[rel="'+ new_value +'"]');
      this.items.removeClass( o.selected_class );
      new_element.addClass( o.selected_class );
      this.element.val( new_value );
      this.handler.text( new_element.text() );
      this._close();
      this._setOption( 'value' , new_value );
      return this;
    } else {
      return current_value;
    }
  }