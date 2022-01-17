function( parent, object, offset ) {
		var i;
		
		if ( parent !== object ) {
			offset.x += object.position.x;
			offset.y += object.position.y;
			offset.z += object.position.z;
		}
		
		for ( i = 0; i < object.children.length; i++ ) {
			if ( object.children[i]._physijs ) {
				object.children[i]._physijs.offset = {
					x: object.children[i].position.x + offset.x,
					y: object.children[i].position.y + offset.y,
					z: object.children[i].position.z + offset.z
				};
				
				if ( object.children[i].useQuaternion !== true ) {
					object.children[i].quaternion.copy(getQuatertionFromEuler( object.children[i].rotation.x, object.children[i].rotation.y, object.children[i].rotation.z ));
				}
				object.children[i]._physijs.rotation = {
					x: object.children[i].quaternion.x,
					y: object.children[i].quaternion.y,
					z: object.children[i].quaternion.z,
					w: object.children[i].quaternion.w
				};
				
				parent._physijs.children.push( object.children[i]._physijs );
			}
			
			addObjectChildren( parent, object.children[i], offset.clone() );
		}
	}