function(delta) {
    var moveDelta = delta * moveSpeed,
        lookDelta = delta * lookSpeed;

    if (moveForward)  camera.translateZ(-moveDelta);
    if (moveBackward) camera.translateZ( moveDelta);
    if (moveLeft)     camera.translateX(-moveDelta);
    if (moveRight)    camera.translateX( moveDelta);

    longitude += mouseX * lookDelta;
    latitude  -= mouseY * lookDelta;
    latitude   = Math.max(-90, Math.min(90, latitude));
    var latitudeRad  = latitude  * Math.PI / 180;
    var longitudeRad = longitude * Math.PI / 180;

    viewTarget.x = camera.position.x + distance * Math.cos(latitudeRad) * Math.cos(longitudeRad);
    viewTarget.z = camera.position.z + distance * Math.cos(latitudeRad) * Math.sin(longitudeRad);
    if (enableVertical) {
      viewTarget.y = camera.position.y + distance * Math.sin(latitudeRad);
    }
    camera.lookAt(viewTarget);
  }