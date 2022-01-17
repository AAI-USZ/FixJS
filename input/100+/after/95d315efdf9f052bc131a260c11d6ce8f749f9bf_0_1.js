function drawPolygon(prim) {    
  var mesh, polypath, polyshape, material;

  // console.log("drawPolygon");

  // Find three points
  var p1 = new THREE.Vector4(prim.coords[0][0][0], prim.coords[0][0][1], prim.coords[0][0][2]);
  var p2 = new THREE.Vector4(prim.coords[1][0][0], prim.coords[1][0][1], prim.coords[1][0][2]);
  var p3 = new THREE.Vector4(prim.coords[2][0][0], prim.coords[2][0][1], prim.coords[2][0][2]);

  //TODO: Check the points are not colinear

  // And Three Vectors
  var v1 = new THREE.Vector3();
  var v2 = new THREE.Vector3();
  var v3 = new THREE.Vector3(); // normal vector

  v1.sub(p2, p1);
  v2.sub(p3, p1);
  v3.cross(v1, v2);

  var normal = new THREE.Vector4(v3.x, v3.y, v3.z, -v3.dot(p1));  // Point p on the plane iff p.normal = 0

  // Point Closest to origin - translation
  var nearest = new THREE.Vector3(
            normal.x*normal.w / (normal.x*normal.x + normal.y*normal.y + normal.z*normal.z),
            normal.y*normal.w / (normal.x*normal.x + normal.y*normal.y + normal.z*normal.z),
            normal.z*normal.w / (normal.x*normal.x + normal.y*normal.y + normal.z*normal.z)
  );

  // Angles to the z axis - rotaton
  var thetax = Math.acos(normal.z / Math.sqrt(normal.y*normal.y + normal.z*normal.z));
  var thetay = Math.acos(normal.z / Math.sqrt(normal.x*normal.x + normal.z*normal.z));
  
  // Linear Transformation Matrix - Rotation + Translation
  var L = new THREE.Matrix4();
  L.makeTranslation(-nearest.x, -nearest.y, -nearest.z);  
  L.multiplySelf(new THREE.Matrix4().makeRotationX(thetax));
  L.multiplySelf(new THREE.Matrix4().makeRotationY(thetay));

  polypath = new THREE.Path();
  for (var i = 0; i < prim.coords.length; i++) {
    tmpv = new THREE.Vector4(prim.coords[i][0][0], prim.coords[i][0][1], prim.coords[i][0][2], 1);
    L.multiplyVector4(tmpv);
    if (i == 0){
        polypath.moveTo(tmpv.x, tmpv.y);
    } else {
        polypath.lineTo(tmpv.x, tmpv.y);
    }
  }
  polypath.lineTo(polypath.curves[0].v1.x, polypath.curves[0].v1.y); // Close the curve

  polyshape = polypath.toShapes();
  polygeom = new THREE.ExtrudeGeometry(polyshape, {amount:0.0, steps:0, bevelEnabled: false});

  // Undo the Linear Transformation
  var Li = new THREE.Matrix4();
  Li.getInverse(L);

  for (var i=0; i < polygeom.vertices.length; i++) {
      tmpv = new THREE.Vector4(polygeom.vertices.x, polygeom.vertices.y, 0.0, 1.0);
      Li.multiplyVector4(tmpv);
      polygeom.vertices.x = tmpv.x
      polygeom.vertices.y = tmpv.y;
      polygeom.vertices.z = tmpv.z;
  }

  mesh = new THREE.Mesh(polygeom, new THREE.MeshBasicMaterial({color: 0x000000}));
  return mesh;
}