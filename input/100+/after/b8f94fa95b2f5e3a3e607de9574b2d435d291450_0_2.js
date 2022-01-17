function( column ) {
      if( this._feedbackLabel === null ) {
        this._feedbackLabel = this._createFeedbackColumn();
      }
      if( this._currentDragColumn !== column ) {
        this._renderLabelY( this._feedbackLabel, column );
        this._feedbackLabel.setWidth( column.getWidth() );
        this._feedbackLabel.setCustomVariant( column.getCustomVariant() );
        this._feedbackLabel.setText( column.getText() );
        this._feedbackLabel.setImage( column.getImage() );
        this._feedbackLabel.setSortIndicator( column.getSortDirection() );
        this._feedbackLabel.setHorizontalChildrenAlign( column.getAlignment() );
        this._feedbackLabel.setDisplay( true );
        this._feedbackLabel.dispatchSimpleEvent( "cancelAnimations" );
        this._currentDragColumn = column;
      }
      return this._feedbackLabel;
    }