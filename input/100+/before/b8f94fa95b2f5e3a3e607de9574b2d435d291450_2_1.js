function() {
      var tree = this._createTreeByProtocol( "w3", "w2", [] );
      var column = this._createColumnByProtocol( "w4", "w3", [] );
      TestUtil.protocolSet( "w4", { "image" : [ "image.png", 10, 20 ] } );
      assertEquals( [ "image.png", 10, 20 ], column.getImage() );
      column.dispose();
      tree.destroy();
    }