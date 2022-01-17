function(bin) {
  if(bin.class != "CSG") throw new Error("Not a CSG");
  var planes = [];
  var planeData = bin.planeData;
  var numplanes = planeData.length / 4;
  var arrayindex = 0;
  for(var planeindex = 0; planeindex < numplanes; planeindex++)
  {
    var x = planeData[arrayindex++];
    var y = planeData[arrayindex++];
    var z = planeData[arrayindex++];
    var w = planeData[arrayindex++];
    var normal = new CSG.Vector3D(x,y,z);
    var plane = new CSG.Plane(normal, w);
    planes.push(plane);
  }

  var vertices = [];
  var vertexData = bin.vertexData;
  var numvertices = vertexData.length / 3;
  arrayindex = 0;
  for(var vertexindex = 0; vertexindex < numvertices; vertexindex++)
  {
    var x = vertexData[arrayindex++];
    var y = vertexData[arrayindex++];
    var z = vertexData[arrayindex++];
    var pos = new CSG.Vector3D(x,y,z);
    var vertex = new CSG.Vertex(pos);
    vertices.push(vertex);
  }

  var shareds = bin.shared.map(function(shared){
    return CSG.Polygon.Shared.fromObject(shared); 
  });

  var polygons = [];
  var numpolygons = bin.numPolygons;
  var numVerticesPerPolygon = bin.numVerticesPerPolygon;
  var polygonVertices = bin.polygonVertices;
  var polygonPlaneIndexes = bin.polygonPlaneIndexes;
  var polygonSharedIndexes = bin.polygonSharedIndexes;
  arrayindex = 0;
  for(var polygonindex = 0; polygonindex < numpolygons; polygonindex++)
  {
    var numpolygonvertices = numVerticesPerPolygon[polygonindex];
    var polygonvertices = [];
    for(var i = 0; i < numpolygonvertices; i++)
    {
      polygonvertices.push(vertices[polygonVertices[arrayindex++]]);
    }
    var plane = planes[polygonPlaneIndexes[polygonindex]];
    var shared = shareds[polygonSharedIndexes[polygonindex]];
    var polygon = new CSG.Polygon(polygonvertices, shared, plane);
    polygons.push(polygon);
  }
  var csg = CSG.fromPolygons(polygons);
  csg.isCanonicalized = true;
  csg.isRetesselated = true;
  return csg;
}