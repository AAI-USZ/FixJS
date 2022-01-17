function( label, column ) {
      this._renderLabelLeft( label, column );
      label.setWidth( column.getWidth() );
      label.setHoverEffect( column.getMoveable() );
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
        label.setVisibility( column.getVisibility() );
        label.setToolTip( column.getToolTip() );
        label.setSortIndicator( column.getSortDirection() );
        label.applyObjectId( column.getObjectId() );
        if( column.isGroup() ) {
          label.setHeight( column.getHeight() );
          label.setChevron( column.isExpanded() ? "expanded" : "collapsed" );
        } else if( column.getGroup() != null ) {
          var groupHeight = column.getGroup().getHeight();
          label.setTop( groupHeight )
          label.setHeight( this.getHeight() - groupHeight );
        }
      }
      label.setCustomVariant( column.getCustomVariant() );
      label.setZIndex( column.isFixed() ? 1e7 : 1 );
      label.setHorizontalChildrenAlign( column.getAlignment() );
    }