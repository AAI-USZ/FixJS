functions.addObject = function( description ) {
	var i,
		localInertia, shape, motionState, rbInfo, body;
	
	shape = createShape( description );
	
	// If there are children then this is a compound shape
	if ( description.children ) {
		var compound_shape = new Ammo.btCompoundShape, _child;
		compound_shape.addChildShape( _transform, shape );
		
		for ( i = 0; i < description.children.length; i++ ) {
			_child = description.children[i];
			var trans = new Ammo.btTransform;
			trans.setIdentity();
			trans.setOrigin(new Ammo.btVector3( _child.position_offset.x, _child.position_offset.y, _child.position_offset.z ));
			trans.setRotation(new Ammo.btQuaternion( _child.rotation.x, _child.rotation.y, _child.rotation.z, _child.rotation.w ));
			
			shape = createShape( description.children[i] );
			compound_shape.addChildShape( trans, shape );
		}
		
		shape = compound_shape;
	}
	
	localInertia = new Ammo.btVector3(0, 0, 0); // #TODO: localIntertia is the local inertia tensor, what does it do and should it be a parameter?
	shape.calculateLocalInertia( description.mass, localInertia );
	
	_transform.setIdentity();
	_transform.setOrigin(new Ammo.btVector3( description.position.x, description.position.y, description.position.z ));
	_transform.setRotation(new Ammo.btQuaternion( description.rotation.x, description.rotation.y, description.rotation.z, description.rotation.w ));
	
	motionState = new Ammo.btDefaultMotionState( _transform ); // #TODO: btDefaultMotionState supports center of mass offset as second argument - implement
	rbInfo = new Ammo.btRigidBodyConstructionInfo( description.mass, motionState, shape, localInertia );
	
	if ( description.materialId !== undefined ) {
		rbInfo.set_m_friction( _materials[ description.materialId ].friction );
		rbInfo.set_m_restitution( _materials[ description.materialId ].restitution );
	}
	
	body = new Ammo.btRigidBody( rbInfo );
	
	if ( typeof description.collision_flags !== 'undefined' ) {
		body.setCollisionFlags( description.collision_flags );
	}
	
	world.addRigidBody( body );
	
	body.id = description.id;
	_objects[ body.id ] = body;
	_objects_ammo[body.a] = body.id;
	_num_objects++;
	
	transferableMessage({ cmd: 'objectReady', params: body.id });
}