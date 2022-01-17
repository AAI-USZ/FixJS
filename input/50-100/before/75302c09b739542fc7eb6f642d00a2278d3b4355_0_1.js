function( cy ){
      window.cy = cy;

      var json = cyutil.entities2json( doc.entities() );
      cy.add( json );

      var nodes = cy.nodes();
      for( var i = 0; i < nodes.length; i++ ){
        var node = nodes[i];
        var id = node.id();

        node.qtip({
          content: {
            text: ui.editNameQtipContent( id )
          }
        });
      }
    }