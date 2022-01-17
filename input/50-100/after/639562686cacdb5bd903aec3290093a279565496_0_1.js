function toCanvasCoords(position) {
    var pos = position.clone();
    var projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
    projScreenMat.multiplyVector3( pos );

    var result = new THREE.Vector3((pos.x + 1 ) * 200, (1-pos.y) * 200, (pos.z + 1 ) * 200);
    return result;
  }