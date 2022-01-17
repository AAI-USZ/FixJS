function drawLine(prim) {
  var mesh, linegeom, tmpvertex;

  // console.log("drawLine");

  linegeom = new THREE.Geometry();

  for (var i = 0; i < prim.coords.length; i++) {
    tmpvertex = new THREE.Vector3(prim.coords[i][0][0], prim.coords[i][0][1], prim.coords[i][0][2]);
    linegeom.vertices.push(tmpvertex);
  }

  mesh = new THREE.Line(linegeom, new THREE.LineBasicMaterial({color: 0x000000}));

  // These three lines prevent grid from being put on the wrong side
  mesh.material.polygonOffset = true;
  mesh.material.polygonOffsetFactor = 1;
  mesh.material.polygonOffsetUnits = 1;

  return(mesh);
}