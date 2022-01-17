function() {
  //OPT: merge dom updates
  northLabel.setPosition( this.model.north.getPosCanvas(this.model.getCamera(), this.canvas) );
  southLabel.setPosition( this.model.south.getPosCanvas(this.model.getCamera(), this.canvas) );
  eastLabel.setPosition( this.model.east.getPosCanvas(this.model.getCamera(), this.canvas) );
  westLabel.setPosition( this.model.west.getPosCanvas(this.model.getCamera(), this.canvas) );
  equinoxLabel.setPosition( this.model.sphere[1].gfx.markerball.getPosCanvas(this.model.getCamera(), this.canvas) );
  npoleLabel.setPosition( this.model.sphere[1].gfx.npole.getPosCanvas(this.model.getCamera(), this.canvas) );
  spoleLabel.setPosition( this.model.sphere[1].gfx.spole.getPosCanvas(this.model.getCamera(), this.canvas) );
  sunLabel.setPosition( this.model.sun.gfx.mesh.getPosCanvas(this.model.getCamera(), this.canvas) ); 
  planetLabel.setPosition( this.model.planet.gfx.mesh.getPosCanvas(this.model.getCamera(), this.canvas) );
}