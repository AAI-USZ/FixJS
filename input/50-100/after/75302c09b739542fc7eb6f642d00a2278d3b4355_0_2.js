function( entity ){
    var ele = cy.add({
      group: 'nodes',
      position: entity.viewport,
      data: {
        id: entity.id,
        name: entity.name,
        type: entity.type
      },
      classes: 'entity' + ( entity.interaction ? ' interaction' : '' )
    });
  }