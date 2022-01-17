function( widget, value ) {
      if( value != null && value !== "" ) {
        var EncodingUtil = org.eclipse.rwt.protocol.EncodingUtil;
        var text = EncodingUtil.escapeText( value, false );
        text = EncodingUtil.replaceNewLines( text, "<br/>" );
        widget.setUserData( "toolTipText", text );
        var toolTip = org.eclipse.rwt.widgets.WidgetToolTip.getInstance();
        widget.setToolTip( toolTip );
        // make sure "boundToWidget" is initialized:
        if( toolTip.getParent() != null ) {
          if( toolTip.getBoundToWidget() == widget ) {
            toolTip.updateText( widget );
          }
        }
      } else {
        widget.setToolTip( null );
        widget.setUserData( "toolTipText", null );
      }
    }