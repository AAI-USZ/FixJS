function( menuItemType ) {
    this.base( arguments, [ "image", "image", "label", "image" ] );
    this._hasSelectionListener = false;
    this._selected = false;
    this._parentMenu = null;
    this._subMenu = null;
    this._subMenuOpen = false;
    this._preferredCellWidths = null;
    this.initTabIndex();
    this.set( {
      width : "auto",
      horizontalChildrenAlign : "left",
      verticalChildrenAlign : "middle"
    } );
    this.addEventListener( "mouseup", this.execute );
    this.addEventListener( "changeFont", this._onFontChange );
    this.addState( menuItemType );
    switch( menuItemType ){
      case "bar" :
       this._isSelectable = false;
       this._isDeselectable = false;
       this._sendEvent = false;
       this.addState( "onMenuBar" );
      break;
      case "push" :
       this._isSelectable = false;
       this._isDeselectable = false;
       this._sendEvent = true;
      break;
      case "check":
       this._isSelectable = true;
       this._isDeselectable = true;
       this._sendEvent = true;
      break;
      case "cascade":
       this._isSelectable = false;
       this._isDeselectable = false;
       this._sendEvent = false;
      break;
      case "radio":
       this._isSelectable = true;
       this._sendEvent = false;
       this.setNoRadioGroup( false );
       org.eclipse.rwt.RadioButtonUtil.registerExecute( this );
      break;
    }
    this._preferredCellWidths = [ 0, 0, 0, 13 ];
    if( this._isSelectable ) {
      this.setCellContent( 0, "" );
    }
  }