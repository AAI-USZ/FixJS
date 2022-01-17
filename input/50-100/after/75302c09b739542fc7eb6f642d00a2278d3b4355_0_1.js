function( cy ){
      window.cy = cy;

      var json = cyutil.entities2json( doc.entities() );
      cy.add( json );
    }