function( object ) {
		THREE.Mesh.prototype.add.call( this, object );
		
		if ( object._physijs ) {
			object.__dirtyPosition = false;
			object.__dirtyRotation = false;
			this._objects[object._physijs.id] = object;
			
			if ( object.children.length ) {
				object._physijs.children = [];
				addObjectChildren( object, object );
			}
			
			object.world = this;
			
			if ( object.material._physijs ) {
				if ( !this._materials.hasOwnProperty( object.material._physijs.id ) ) {
					this.execute( 'registerMaterial', object.material._physijs );
					object._physijs.materialId = object.material._physijs.id;
				}
			}
			
			// Object starting position + rotation		
			object._physijs.position = { x: object.position.x, y: object.position.y, z: object.position.z };	
			if (!object.useQuaternion) {
				_matrix.identity().setRotationFromEuler( object.rotation );
				object.quaternion.setFromRotationMatrix( _matrix );
			};
			object._physijs.rotation = { x: object.quaternion.x, y: object.quaternion.y, z: object.quaternion.z, w: object.quaternion.w };
			
			this.execute( 'addObject', object._physijs );
		}
	}