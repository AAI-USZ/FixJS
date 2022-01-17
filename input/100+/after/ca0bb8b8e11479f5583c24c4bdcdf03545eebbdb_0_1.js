function() {
    var self = this
      , o    = this.options
    ;
    
    this.doc_body.bind( 'click' , $.proxy( this._close , this ) );
    
    this.skinned.bind( 'click.select' , function(e){ e.stopPropagation(); } );
    
    this.handler.bind( 'click.select' , function(e) {
      if( self.options.disabled ) { return; }
      self._toggle( e );
    });
    
    this.holder_items.bind( 'click.select' , function(e) {
      if( self.options.disabled ) { return; }
      self._toggle( e );
    });
    
    this.items.bind( 'click.select-setvalues' , function(e) {
      e.preventDefault();
      e.stopPropagation();
      if( self.options.disabled || $(e.currentTarget).hasClass( o.selected_class ) ) { return; }
      self.value($(e.currentTarget).attr('rel'));
      
      // self.value({
      //   value: $(e.currentTarget).attr('rel'),
      //   label: $(e.currentTarget).text()
      // });
    });
  }