function(cam) {

  // fix some Three.js bogus  
  if(this.currentCamera && this.currentScene) 
    this.currentScene.remove(this.currentCamera);
  this.currentCamera = this.cameras[cam].instance;
  if(this.currentScene) this.currentScene.add(this.currentCamera);
  
  if(!this.model) return;
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