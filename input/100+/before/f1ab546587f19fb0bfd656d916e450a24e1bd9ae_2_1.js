function(index, value){
		var s = toShape.convert(value);
		var g = s.extrude({amount: height});
		
		g.computeBoundingBox();
		var bBox = g.boundingBox;
		// record the position of the geometry
		var position = new THREE.Vector3((bBox.min.x+bBox.max.x)*.5, 
			(bBox.min.y+bBox.max.y)*.5, 0);
		/* move the geometry to center, so that later rotation of
		 * the mesh will be around the center of the geometry
		 */
		THREE.GeometryUtils.center(g);
		
		var mesh = new THREE.Mesh(g, material);
		// recover the original position of the geometry
		mesh.position = position;
		
		// replay transforms in original SVG
		$.each(s.transforms, function(index, t){
			if(t[0] == 'T')
			{
				mesh.translateX(t[1]);
				mesh.translateY(t[2]);
			}else if(t[0] == 'R'){
				mesh.rotation.z += t[1] * Math.PI /180;
			}
		});
		
		THREE.GeometryUtils.merge(geometry, mesh);
	}