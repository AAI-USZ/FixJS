function generateCollisionShape(rigidBody) {
      var cmap = rigidBody.getCollisionMap();
      if (cmap.getResult()) return cmap.getResult();
      
      var shapes = cmap.getShapes();
      var shape, i, iMax, f, fMax, scale, mesh, btShapes = [];   
      var btShape = null;
      
      for (i = 0, iMax = shapes.length; i<iMax; i++) {
        shape = shapes[i];
        btShape = null;
        
      /*
        //    TODO: optimize shape allocation with a shapeBin:

        if (shape_in.type !== enums.collision.shape.MESH && shapeBin[shape_in.type] === undef) {
          shapeBin[shape_in.type] = [];
        }
        
        var cached = false;

        if (shape_in.type !== enums.collision.shape.MESH) {
          if (!shapeBin[shape_in.type][scale[0]]) shapeBin[shape_in.type][scale[0]] = [];
          if (!shapeBin[shape_in.type][scale[0]][scale[1]]) shapeBin[shape_in.type][scale[0]][scale[1]] = [];
        }
        
        if (shapeBin[shape_in.type][scale[0]][scale[1][scale[2]]) {
          
        } else {
          shapeBin[shape_in.type][scale[0]][scale[1][scale[2]] = shape_in;
        }
      
      */
        
        if (shape.type === enums.collision.shape.BOX) {
          btShape = new Ammo.btBoxShape(new Ammo.btVector3(shape.size[0]/2,shape.size[1]/2,shape.size[2]/2));
        } else if (shape.type === enums.collision.shape.SPHERE) {
          btShape = new Ammo.btSphereShape(shape.radius);
        } else if (shape.type === enums.collision.shape.CAPSULE) {
          btShape = new Ammo.btCapsuleShape(shape.radius,shape.height);
        } else if (shape.type === enums.collision.shape.CYLINDER) {
          btShape = new Ammo.btCylinderShape(new Ammo.btVector3(shape.size[0]/2,shape.size[1]/2,shape.size[2]/2));
        } else if (shape.type === enums.collision.shape.CONE) {
          btShape = new Ammo.btConeShape(shape.radius,shape.height);
        } else if (shape.type === enums.collision.shape.MESH) {
          mesh = shape.mesh;

          var mTriMesh = new Ammo.btTriangleMesh();

          scale = shape.size;

          var v0 = new Ammo.btVector3(0,0,0);
          var v1 = new Ammo.btVector3(0,0,0); 
          var v2 = new Ammo.btVector3(0,0,0); 
    
          var mats = mesh.getMaterials();

          for (f = 0, fMax = mesh.faces.length; f < fMax; f++)
          {
              var face = mesh.faces[f];
              var mat = mats[face.material];
              if (!mat.collision) continue;
              
              if (face.points.length !== 3) continue;

              v0.setValue(mesh.points[face.points[0]][0]*scale[0],mesh.points[face.points[0]][1]*scale[1],mesh.points[face.points[0]][2]*scale[2]);
              v1.setValue(mesh.points[face.points[1]][0]*scale[0],mesh.points[face.points[1]][1]*scale[1],mesh.points[face.points[1]][2]*scale[2]);
              v2.setValue(mesh.points[face.points[2]][0]*scale[0],mesh.points[face.points[2]][1]*scale[1],mesh.points[face.points[2]][2]*scale[2]);
    
              mTriMesh.addTriangle(v0,v1,v2);
            }
  
            if (rigidBody.getMass() === 0.0 || rigidBody.getType() == enums.physics.body.STATIC || rigidBody.getType() == enums.physics.body.GHOST)  // static
            {
              rigidBody.setMass(0);
              // btScaledBvhTriangleMeshShape -- if scaled instances
              btShape = new Ammo.btBvhTriangleMeshShape(mTriMesh,true);
            }
            else
            { 
              // btGimpactTriangleMeshShape -- complex?
              // btConvexHullShape -- possibly better?
              btShape = new Ammo.btConvexTriangleMeshShape(mTriMesh,true);
            }
        } else if (shape.type === enums.collision.shape.CONVEX_HULL) {
          mesh = shape.mesh;
          scale = shape.size;

          var v = new Ammo.btVector3(0,0,0);
          btShape = new Ammo.btConvexHullShape();

          for (f = 0, fMax = mesh.points.length; f < fMax; f++)
          {
            vec3bt_copy([mesh.points[f][0]*scale[0],mesh.points[f][1]*scale[1],mesh.points[f][2]*scale[2]],v);
            btShape.addPoint(v);
          }
        } else if (shape.type === enums.collision.shape.HEIGHTFIELD) {
            mesh = shape.mesh;
            var xdiv = 0, xsize = 0;
            var zdiv = 0, zsize = 0;
            var points,heightfield;

            // allow heightfield type patch-over
            if (shape.landscape && !shape.getHeightField && shape.landscape instanceof base.HeightField) {
                shape.heightfield = shape.landscape;    // patch
            } else if (shape.landscape && shape.landscape instanceof base.Landscape) {
              xdiv = shape.landscape.getHeightField().getDivX();
              zdiv = shape.landscape.getHeightField().getDivZ();
              xsize = shape.landscape.getHeightField().getSizeX();
              zsize = shape.landscape.getHeightField().getSizeZ();
              points = shape.landscape.getMesh().points;
              heightfield = shape.landscape.getHeightField();
            } 
            
            // heightfield direct
            if (shape.heightfield && shape.heightfield instanceof base.HeightField) {
              xdiv = shape.heightfield.getDivX();
              zdiv = shape.heightfield.getDivZ();
              xsize = shape.heightfield.getSizeX();
              zsize = shape.heightfield.getSizeZ();
              points = shape.getMesh().points;  // todo: eliminate this, not needed with new heightfield
              heightfield = shape.heightfield;
            }

            var upIndex = 1; 
	        var maxHeight = 100;	
	        var flipQuadEdges=false;

            // TODO: store this pointer for doing updates!
/* */
            // todo: convert this to use the heightfield data, not the mesh data...
            var ptr = Ammo.allocate(points.length*4, "float", Ammo.ALLOC_NORMAL);

            for (f = 0, fMax = xdiv*zdiv; f < fMax; f++) {
//              Ammo.HEAPF32[(ptr>>2)+f] = points[f][1];   // also works in place of next line
              Ammo.setValue(ptr+(f<<2), points[f][1], 'float');
//              console.log(Ammo.getValue(ptr+(f<<2), 'float'));
            }

/* 
            var ptr = Ammo.allocate(points.length*8, "double", Ammo.ALLOC_NORMAL);
            var heapf64 = new Float64Array(Ammo.HEAPF32.buffer);
            for (f = 0, fMax = xdiv*zdiv; f < fMax; f++) {
                heapf64[(ptr>>3)+f] = points[f][1];
//                Ammo.setValue(ptr+(f<<3), points[f][1], 'double');
//                console.log(Ammo.getValue(ptr+(f<<3), 'double'));
            }
*/

            var scalarType = {
                FLOAT: 0,
                DOUBLE: 1,
                INTEGER: 2,
                SHORT: 3,
                FIXEDPOINT88: 4,
                UCHAR: 5
            };

	        btShape = new Ammo.btHeightfieldTerrainShape(xdiv, zdiv, ptr, 1, -maxHeight, maxHeight, upIndex, scalarType.FLOAT, flipQuadEdges);
//	        btShape = new Ammo.btHeightfieldTerrainShape(xdiv, zdiv, ptr, 1, -maxHeight, maxHeight, upIndex, scalarType.DOUBLE, flipQuadEdges);

	        btShape.setUseDiamondSubdivision(true);

            var localScaling = new Ammo.btVector3(xsize/(xdiv),1,zsize/(zdiv));

	        btShape.setLocalScaling(localScaling);

	        // todo: investigate why we're 1/2 cell size off of ammo heightfield..
            // patch start
            utrans = new Ammo.btTransform();
            btMetaShape = new Ammo.btCompoundShape(false);

            utrans.setIdentity();
            utrans.setOrigin(vec3bt([-heightfield.getCellSize()/2,0,-heightfield.getCellSize()/2]));

            btMetaShape.addChildShape(utrans,btShape);
            btShape = btMetaShape;
            // patch end
        }
        
        if (btShape) {
          if (shape.margin!==0.0) {
            btShape.setMargin(shape.margin);
          }
          btShapes.push({cShape:shape, btShape:btShape});
        }
      }
      
      var btResultShape = null;
        
      if (btShapes.length===1) {  // single shape, just return it
        btResultShape = btShapes[0].btShape;
      } else if (btShapes.length>1) { // compound multi-shape
        utrans = new Ammo.btTransform();
        btResultShape = new Ammo.btCompoundShape(false); // not animating internal shape yet, set to false for now

        for (i = 0, iMax=btShapes.length; i < iMax; i++)
        {
          // use relative transform for shape
          utrans.setIdentity();
          utrans.setOrigin(vec3bt(btShapes[i].cShape.position));
          utrans.setRotation(vec3btquat(btShapes[i].cShape.rotation));

          btResultShape.addChildShape(utrans,btShapes[i].btShape);
        }
      } // TODO: btMultiSphereShape optimized for sphere clusters

      // cache the completed shape for collision map re-use
      cmap.setResult(btResultShape);

      return btResultShape;
  }