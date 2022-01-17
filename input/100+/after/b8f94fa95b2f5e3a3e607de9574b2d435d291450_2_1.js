function() {
      var tree = this._createTreeByProtocol( "w3", "w2", [] );
      tree.setFooterVisible( true );
      var column = this._createColumnByProtocol( "w4", "w3", [] );
      TestUtil.protocolSet( "w4", { "footerText" : "foo<>\" bar" } );
      TestUtil.flush();

      TestUtil.protocolSet( "w4", { "visibility" : false } );
      TestUtil.flush();

      var label = this._getColumnLabel( tree, column, true );
      assertFalse( label.isSeeable() );
      column.dispose();
      tree.destroy();
    }