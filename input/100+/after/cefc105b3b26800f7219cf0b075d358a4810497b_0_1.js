function( parent, object ) {
		var i;
		
		for ( i = 0; i < object.children.length; i++ ) {
			if ( object.children[i]._physijs ) {
				object.children[i].updateMatrix();
				object.children[i].updateMatrixWorld();
				
				_temp_vector3_1.getPositionFromMatrix( object.children[i].matrixWorld );
				_quaternion_1.setFromRotationMatrix( object.children[i].matrixWorld );
				
				object.children[i]._physijs.position_offset = {
					x: _temp_vector3_1.x,
					y: _temp_vector3_1.y,
					z: _temp_vector3_1.z
				};
				
				object.children[i]._physijs.rotation = {
					x: _quaternion_1.x,
					y: _quaternion_1.y,
					z: _quaternion_1.z,
					w: _quaternion_1.w
				};
				
				parent._physijs.children.push( object.children[i]._physijs );
			}
			
			addObjectChildren( parent, object.children[i] );
		}
	}