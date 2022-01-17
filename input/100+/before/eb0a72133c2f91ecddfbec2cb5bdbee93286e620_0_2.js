function(plane) {
    // Ideally we would like to do an intersection with a polygon of inifinite size
    // but this is not supported by our implementation. As a workaround, we will create
    // a cube, with one face on the plane, and a size larger enough so that the entire
    // solid fits in the cube.

    // find the max distance of any vertex to the center of the plane:
    var planecenter = plane.normal.times(plane.w);
    var maxdistance = 0;
    this.polygons.map(function(polygon){
      polygon.vertices.map(function(vertex){
        var distance = vertex.pos.distanceToSquared(planecenter);
        if(distance > maxdistance) maxdistance = distance;
      });
    });
    maxdistance = Math.sqrt(maxdistance);
    maxdistance *= 1.01; // make sure it's really larger
    
    // Now build a polygon on the plane, at any point farther than maxdistance from the plane center:
    var vertices = [];
    var orthobasis = new CSG.OrthoNormalBasis(plane);
    vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(maxdistance,-maxdistance))));
    vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(-maxdistance,-maxdistance))));
    vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(-maxdistance,maxdistance))));
    vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(maxdistance,maxdistance))));
    var polygon = new CSG.Polygon(vertices, null, plane.flipped());
    
    // and extrude the polygon into a cube, backwards of the plane:
    var cube = polygon.extrude(plane.normal.times(-maxdistance));
    
    // Now we can do the intersection:
    var result = this.intersect(cube);
    result.properties = this.properties;  // keep original properties
    return result;
  }