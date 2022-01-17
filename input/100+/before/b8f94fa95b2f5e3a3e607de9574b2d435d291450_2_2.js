function() {
      var tree = this._createTreeByProtocol( "w3", "w2", [] );
      tree.setItemMetrics( 0, 0, 200, 0, 0, 0, 0 );
      tree.setHeaderVisible( true );
      var column = this._createColumnByProtocol( "w4", "w3", [] );
      this._createColumnByProtocol( "w5", "w3", [] );
      TestUtil.protocolSet( "w4", { "left" : 3, "width" : 20, "moveable" : true } );
      TestUtil.flush();
      var button = qx.event.type.MouseEvent.buttons.left;
      TestUtil.initRequestLog();
      var label = this._getColumnLabel( tree, column )

      TestUtil.fakeMouseEventDOM( label.getElement(), "mousedown", button, 13, 3 );
      TestUtil.flush();
      TestUtil.fakeMouseEventDOM( label.getElement(), "mousemove", button, 70, 3 );
      TestUtil.flush();
      TestUtil.fakeMouseEventDOM( label.getElement(), "mouseup", button, 70, 3 );
      TestUtil.flush();
      var feedbackLabel = this._getColumnDragFeedback( tree );
      org.eclipse.swt.EventUtil.setSuspended( true );
      TestUtil.protocolSet( "w4", { "left" : 30 } );
      TestUtil.flush();
      org.eclipse.swt.EventUtil.setSuspended( false );
      assertTrue( feedbackLabel.isSeeable() );
      org.eclipse.rwt.Animation._mainLoop();
      var animation = org.eclipse.rwt.Animation._queue[ 0 ];
      tree.destroy();
      TestUtil.flush();
      org.eclipse.rwt.Animation._mainLoop();

      assertTrue( feedbackLabel.isDisposed() );
      assertTrue( animation.isDisposed() );
    }