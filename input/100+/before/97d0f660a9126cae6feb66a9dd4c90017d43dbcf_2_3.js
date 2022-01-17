function() {
  // setup camera
  // TODO : shorten
  
  var cameraParams = { 
    fov: 70,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far : 10000
  };
  
  this.cameras = { 
    Trackball: { 
      caption: "Global",
      instance: new THREE.BallCamera(cameraParams)
    },
    FPS: { 
      caption: "Local",
      instance: new THREE.FPSCamera(cameraParams)
    },
    TrackballIso: { 
      caption: "Isometric",
      instance: new THREE.BallCamera(cameraParams)
    }
  };
  this.cameras["Trackball"].instance.setEye({x: 0, y: 0, z: -18});
  this.cameras["FPS"].instance.setEye({x: 0, y: 0.5, z: 0});
  this.cameras["TrackballIso"].instance.setEye({x: 0, y: 0, z: -10});
  var ortho = 70;
  this.cameras["TrackballIso"].instance.projectionMatrix.makeOrthographic( 
      window.innerWidth / - ortho,
      window.innerWidth / ortho,
      window.innerHeight / ortho,
      window.innerHeight / - ortho,
      -10,
      1000
   );	


  // set trackball as default camera
  this.setCamera("Trackball");
  this.resize();

}