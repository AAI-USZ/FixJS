function() {
  //OPT: merge dom updates
  northLabel.setPosition( this.model.north.getPosCanvas(this.currentCamera, this.canvas) );
  southLabel.setPosition( this.model.south.getPosCanvas(this.currentCamera, this.canvas) );
  eastLabel.setPosition( this.model.east.getPosCanvas(this.currentCamera, this.canvas) );
  westLabel.setPosition( this.model.west.getPosCanvas(this.currentCamera, this.canvas) );
  equinoxLabel.setPosition( this.model.sphere[1].gfx.markerball.getPosCanvas(this.currentCamera, this.canvas) );
  npoleLabel.setPosition( this.model.sphere[1].gfx.npole.getPosCanvas(this.currentCamera, this.canvas) );
  spoleLabel.setPosition( this.model.sphere[1].gfx.spole.getPosCanvas(this.currentCamera, this.canvas) );
  sunLabel.setPosition( this.model.sun.gfx.mesh.getPosCanvas(this.currentCamera, this.canvas) ); 
  planetLabel.setPosition( this.model.planet.gfx.mesh.getPosCanvas(this.currentCamera, this.canvas) );
}