function() {
    var ASPECT, FAR, HEIGHT, NEAR, VIEW_ANGLE, WIDTH, camera, coordTransform, element, pMaterial, particle, particleSystem, particleVertex, particles, pos, renderer, scene, update, _i, _len,
      _this = this;
    particles = new THREE.Geometry();
    coordTransform = function(ra, dec, redshift) {
      var x, y, z;
      x = redshift * Math.sin(ra) * Math.cos(dec);
      y = redshift * Math.sin(ra) * Math.sin(dec);
      z = redshift * Math.cos(ra);
      return [x, y, z];
    };
    WIDTH = 1024;
    HEIGHT = 768;
    VIEW_ANGLE = 45;
    ASPECT = WIDTH / HEIGHT;
    NEAR = 0.1;
    FAR = 10000;
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.Camera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene = new THREE.Scene();
    element = $("#canvas");
    camera.position.z = 300;
    renderer.setClearColor(new THREE.Color(0, 1));
    renderer.setSize(WIDTH, HEIGHT);
    element.append(renderer.domElement);
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFF,
      size: 1
    });
    for (_i = 0, _len = sdssData.length; _i < _len; _i++) {
      particle = sdssData[_i];
      pos = coordTransform(particle[1], particle[0], particle[2]);
      particleVertex = new THREE.Vertex(new THREE.Vector3(pos[0] * 200, pos[1] * 200, pos[2] * 200));
      particles.vertices.push(particleVertex);
    }
    particleSystem = new THREE.ParticleSystem(particles, pMaterial);
    update = function() {
      particleSystem.rotation.y += 0.01;
      renderer.render(scene, camera);
      return requestAnimFrame(update);
    };
    scene.addChild(particleSystem);
    renderer.render(scene, camera);
    return requestAnimFrame(update);
  }