function(cam) {

  // fix some Three.js bogus  
//  if(this.model.getCamera() && this.currentScene) 
//    this.currentScene.remove(this.model.getCamera());
//  this.model.setCamera( this.cameras[cam].instance );
//  if(this.currentScene) this.currentScene.add(this.model.getCamera());
  
  if(!this.model) return;
  this.model.setCamera( this.cameras[cam].instance );
  switch(cam) {
    case "Trackball":
    case "TrackballIso":
      this.model.earth.setEnabled(true);
      this.model.earthPlane.setEnabled(false);       
      break;
    case "FPS":
      this.model.earth.setEnabled(false);
      this.model.earthPlane.setEnabled(true);          
  };
  
}