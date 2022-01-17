function( label, column ) {
      this._renderLabelLeft( label, column );
      label.setWidth( column.getWidth() );
      label.setHoverEffect( column.getMoveable() );
      label.setVisibility( column.getVisibility() );
      if( this._footer ) {
        label.setText( column.getFooterText() );
        label.setImage( column.getFooterImage() );
        if( column.getFooterFont() !== null ) {
          label.setFont( column.getFooterFont() );
        } else {
          label.resetFont()
        }
      } else {
        if( column.getFont() !== null ) {
          label.setFont( column.getFont() );
        } else {
          label.resetFont()
        }
        label.setText( column.getText() );
        label.setImage( column.getImage() );
        label.setToolTip( column.getToolTip() );
        label.setSortIndicator( column.getSortDirection() );
        label.applyObjectId( column.getObjectId() );
        if( column.isGroup() ) {
          label.setChevron( column.isExpanded() ? "expanded" : "collapsed" );
        }
        this._renderLabelY( label, column );
      }
      label.setCustomVariant( column.getCustomVariant() );
      label.setZIndex( column.isFixed() ? 1e7 : 1 );
      label.setHorizontalChildrenAlign( column.getAlignment() );
    }