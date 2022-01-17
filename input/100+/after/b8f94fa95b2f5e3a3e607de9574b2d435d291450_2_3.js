function() {
      var tree = this._createTreeByProtocol( "w3", "w2", [] );
      tree.setHeaderHeight( 50 );
      var column = this._createColumnByProtocol( "w4", "w3", [] );
      var group = this._createColumnGroupByProtocol( "w5", "w3", [], true );
      var columnTwo = this._createColumnByProtocol( "w6", "w3", [] );
      var button = qx.event.type.MouseEvent.buttons.left;
      TestUtil.protocolSet( "w4", { "group" : "w5", "left" : 22, "width": 20, "moveable" : true } );
      TestUtil.protocolSet( "w5", { "height" : 22, "left" : 22, "width": 20 } );
      TestUtil.protocolSet( "w6", { "left" : 42, "width": 40, "moveable" : true } );
      TestUtil.flush();
      var label = this._getColumnLabel( tree, column );
      var labelTwo = this._getColumnLabel( tree, columnTwo );

      TestUtil.fakeMouseEventDOM( label.getElement(), "mousedown", button, 13, 3 );
      TestUtil.flush();
      TestUtil.fakeMouseEventDOM( label.getElement(), "mousemove", button, 20, 3 );
      TestUtil.flush();
      TestUtil.fakeMouseEventDOM( label.getElement(), "mouseup", button, 20, 3 );
      TestUtil.flush();
      TestUtil.protocolSet( "w4", { "left" : 22 } );
      TestUtil.flush();
      TestUtil.skipAnimations();
      TestUtil.flush();
      assertFalse( this._getColumnDragFeedback( tree ).isSeeable() );
      TestUtil.flush();
      TestUtil.fakeMouseEventDOM( labelTwo.getElement(), "mousedown", button, 13, 3 );
      TestUtil.flush();
      TestUtil.fakeMouseEventDOM( labelTwo.getElement(), "mousemove", button, 20, 3 );
      TestUtil.flush();

      var feedback = this._getColumnDragFeedback( tree );
      assertTrue( feedback.isSeeable() );
      assertEquals( "100%", feedback.getHeight() );
      column.dispose();
      tree.destroy();
    }