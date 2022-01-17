function() {
      var tree = this._createTreeByProtocol( "w3", "w2", [] );
      tree.setItemMetrics( 0, 0, 200, 0, 0, 0, 0 );
      tree.setHeaderVisible( true );
      var column = this._createColumnByProtocol( "w4", "w3", [] );
      var colTwo = this._createColumnByProtocol( "w5", "w3", [] );
      TestUtil.protocolSet( "w4", { "left" : 3, "width" : 20 } );

      TestUtil.protocolSet( "w5", { "left" : 23, "width" : 40, "visibility" : false  } );
      TestUtil.flush();

      var dummyLabel = this._getDummyLabel( tree );
      assertEquals( 23, dummyLabel.getLeft() );
      column.dispose();
      colTwo.dispose();
      tree.destroy();
    }