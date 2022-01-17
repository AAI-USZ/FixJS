function(e){
    cy.on('drag updateposition', 'node', function(){ // note: only on drag (otherwise we could get an infite loop with `position`)
      updateNodePosition(this);
    });
  }