function initCamera() {
    camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      1,
      10000
    );
    camera.position.x = -1000;
    camera.position.y = 100;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
      x: 0,
      y: 100,
      z: 0
    });
    scene.add(camera);
  }