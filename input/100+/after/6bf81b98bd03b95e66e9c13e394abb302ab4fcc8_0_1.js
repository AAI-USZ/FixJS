function drawPoint(prim) {
  var mesh, pointgeom, pointmat, tmpvertex;

  // console.log("drawPoint");

  pointgeom = new THREE.Geometry();
  for (var i = 0; i < prim.coords.length; i++) {
    tmpvertex = new THREE.Vector3(prim.coords[i][0][0], prim.coords[i][0][1], prim.coords[i][0][2]);
    pointgeom.vertices.push(tmpvertex);
  }

  pointmat = new THREE.ParticleBasicMaterial({ color: 0x000000, size: 0.1 });

  mesh = new THREE.ParticleSystem(pointgeom, pointmat);

  return(mesh);
}