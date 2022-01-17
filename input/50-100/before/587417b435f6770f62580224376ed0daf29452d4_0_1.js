function(e){
    cy.on('drag', 'node', function(){ // note: only on drag (otherwise we could get an infite loop with `position`)
      updateNodePosition(this);
    });

    cy.on('layoutstop', function(){ // also update position after a layout finishes (but not during)
      var nodes = cy.nodes();

      for( var i = 0; i < nodes.length; i++ ){
        var node = nodes[i];

        updateNodePosition(node);
      }
    });
  }