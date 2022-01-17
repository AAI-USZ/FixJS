function() {
    var csg = this.canonicalized();
    var numpolygons = csg.polygons.length;
    var numpolygonvertices = 0;
    var numvertices = 0;
    var vertexmap = {};
    var vertices = [];
    var numplanes = 0;
    var planemap = {};
    var polygonindex = 0;
    var planes = [];
    var shareds = [];
    var sharedmap = {};
    var numshared = 0;
    csg.polygons.map(function(p){
      p.vertices.map(function(v){
        ++numpolygonvertices;
        var vertextag = v.getTag();
        if(! (vertextag in vertexmap))
        { 
          vertexmap[vertextag] = numvertices++;
          vertices.push(v);
        }
      });
      var planetag = p.plane.getTag();
      if(! (planetag in planemap))
      { 
        planemap[planetag] = numplanes++;
        planes.push(p.plane);
      }
      var sharedtag = p.shared.getTag();
      if(! (sharedtag in sharedmap))
      { 
        sharedmap[sharedtag] = numshared++;
        shareds.push(p.shared);
      }      
    });
    var numVerticesPerPolygon = new Uint32Array(numpolygons);
    var polygonSharedIndexes = new Uint32Array(numpolygons);
    var polygonVertices = new Uint32Array(numpolygonvertices);
    var polygonPlaneIndexes = new Uint32Array(numpolygons);
    var vertexData = new Float64Array(numvertices * 3);
    var planeData = new Float64Array(numplanes * 4);
    var polygonVerticesIndex = 0;
    for(var polygonindex = 0; polygonindex < numpolygons; ++polygonindex)
    {
      var p = csg.polygons[polygonindex];   
      numVerticesPerPolygon[polygonindex] = p.vertices.length;
      p.vertices.map(function(v){
        var vertextag = v.getTag();
        var vertexindex = vertexmap[vertextag];
        polygonVertices[polygonVerticesIndex++] = vertexindex;
      });
      var planetag = p.plane.getTag();
      var planeindex = planemap[planetag];
      polygonPlaneIndexes[polygonindex] = planeindex;
      var sharedtag = p.shared.getTag();
      var sharedindex = sharedmap[sharedtag];
      polygonSharedIndexes[polygonindex] = sharedindex;
    }
    var verticesArrayIndex = 0;
    vertices.map(function(v){
      var pos = v.pos;
      vertexData[verticesArrayIndex++] = pos._x; 
      vertexData[verticesArrayIndex++] = pos._y; 
      vertexData[verticesArrayIndex++] = pos._z; 
    });
    var planesArrayIndex = 0;
    planes.map(function(p){
      var normal = p.normal;
      planeData[planesArrayIndex++] = normal._x; 
      planeData[planesArrayIndex++] = normal._y; 
      planeData[planesArrayIndex++] = normal._z;
      planeData[planesArrayIndex++] = p.w;
    });
    var result = {
      class: "CSG",
      numPolygons: numpolygons,
      numVerticesPerPolygon: numVerticesPerPolygon,
      polygonPlaneIndexes: polygonPlaneIndexes,
      polygonSharedIndexes: polygonSharedIndexes,
      polygonVertices: polygonVertices, 
      vertexData: vertexData,
      planeData: planeData,
      shared: shareds,
    };
    return result;
  }