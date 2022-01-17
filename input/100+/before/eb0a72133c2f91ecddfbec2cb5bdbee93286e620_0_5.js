function(options) {
    var offsetvector = CSG.parseOptionAs3DVector(options, "offset", [0,0,1]);
    var twistangle = CSG.parseOptionAsFloat(options, "twistangle", 0);
    var twiststeps = CSG.parseOptionAsInt(options, "twiststeps", 10);
    
    if(twistangle == 0) twiststeps = 1;
    if(twiststeps < 1) twiststeps = 1;
    
    var newpolygons = [];
    var prevtransformedcag;
    var prevstepz;
    for(var step=0; step <= twiststeps; step++)
    {
      var stepfraction = step / twiststeps;
      var transformedcag = this;
      var angle = twistangle * stepfraction;
      if(angle != 0)
      {
        transformedcag = transformedcag.rotateZ(angle);
      }
      var translatevector = new CSG.Vector2D(offsetvector.x, offsetvector.y).times(stepfraction);
      transformedcag = transformedcag.translate(translatevector);
      var bounds = transformedcag.getBounds();
      bounds[0] = bounds[0].minus(new CSG.Vector2D(1,1));
      bounds[1] = bounds[1].plus(new CSG.Vector2D(1,1));
      var stepz = offsetvector.z * stepfraction; 
      if( (step == 0) || (step == twiststeps) )
      {
        // bottom or top face:
        var csgshell = transformedcag.toCSG(stepz-1, stepz+1);
        var csgplane = CSG.fromPolygons([new CSG.Polygon([
          new CSG.Vertex(new CSG.Vector3D(bounds[0].x, bounds[0].y, stepz)),
          new CSG.Vertex(new CSG.Vector3D(bounds[1].x, bounds[0].y, stepz)),
          new CSG.Vertex(new CSG.Vector3D(bounds[1].x, bounds[1].y, stepz)),
          new CSG.Vertex(new CSG.Vector3D(bounds[0].x, bounds[1].y, stepz))
        ])]);
        var flip = (step == 0); 
        if(offsetvector.z < 0) flip = !flip;
        if(flip)
        {
          csgplane = csgplane.inverse();
        }
        csgplane = csgplane.intersect(csgshell);
        // only keep the polygons in the z plane:
        csgplane.polygons.map(function(polygon){
          if(Math.abs(polygon.plane.normal.z) > 0.99)
          {
            newpolygons.push(polygon);
          }
        });
      }
      if(step > 0)
      {
        var numsides = transformedcag.sides.length;
        for(var sideindex = 0; sideindex < numsides; sideindex++)
        {
          var thisside = transformedcag.sides[sideindex];
          var prevside = prevtransformedcag.sides[sideindex];
          var p1 = new CSG.Polygon([
            new CSG.Vertex(thisside.vertex1.pos.toVector3D(stepz)),
            new CSG.Vertex(thisside.vertex0.pos.toVector3D(stepz)),
            new CSG.Vertex(prevside.vertex0.pos.toVector3D(prevstepz))
          ]);          
          var p2 = new CSG.Polygon([
            new CSG.Vertex(thisside.vertex1.pos.toVector3D(stepz)),
            new CSG.Vertex(prevside.vertex0.pos.toVector3D(prevstepz)),
            new CSG.Vertex(prevside.vertex1.pos.toVector3D(prevstepz))
          ]);
          if(offsetvector.z < 0)
          {
            p1 = p1.flipped();
            p2 = p2.flipped();
          }
          newpolygons.push(p1);
          newpolygons.push(p2);                    
        } 
      }
      prevtransformedcag = transformedcag;
      prevstepz = stepz;
    }  // for step  
    return CSG.fromPolygons(newpolygons);
  }