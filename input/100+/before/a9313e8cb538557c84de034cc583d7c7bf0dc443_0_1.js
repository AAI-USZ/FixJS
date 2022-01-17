f	var index, object,
		transform = new Ammo.btTransform(), origin, rotation,
		offset = 0,
		i = 0;
	
	if ( worldreport.length < 2 + _num_objects * WORLDREPORT_ITEMSIZE ) {
		worldreport = new Float32Array(worldreport.length + REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE); // message id + # of objects to report + chunk size * # of values per object
		worldreport[0] = MESSAGE_TYPES.WORLDREPORT;
	}
	
	worldreport[1] = _num_objects; // record how many objects we're reporting on
	
	//for ( i = 0; i < worldreport[1]; i++ ) {
	for ( index in _objects ) {
		if ( _objects.hasOwnProperty( index ) ) {
			object = _objects[index];
			
			// #TODO: we can't use center of mass transform when center of mass can change,
			//        but getMotionState().getWorldTransform() screws up on objects that have been moved
			//object.getMotionState().getWorldTransform( transform );
			transform = object.getCenterOfMassTransform();
			
			origin = transform.getOrigin();
			rotation = transform.getRotation();
			
			// add values to report
			offset = 2 + (i++) * WORLDREPORT_ITEMSIZE;
			
			worldreport[ offset ] = object.id;
			
			worldreport[ offset + 1 ] = origin.x();
			worldreport[ offset + 2 ] = origin.y();
			worldreport[ offset + 3 ] = origin.z();
			
			worldreport[ offset + 4 ] = rotation.x();
			worldreport[ offset + 5 ] = rotation.y();
			worldreport[ offset + 6 ] = rotation.z();
			worldreport[ offset + 7 ] = rotation.w();
			
			_vector = object.getLinearVelocity();
			worldreport[ offset + 8 ] = _vector.x();
			worldreport[ offset + 9 ] = _vector.y();
			worldreport[ offset + 10 ] = _vector.z();
			
			_vector = object.getAngularVelocity();
			worldreport[ offset + 11 ] = _vector.x();
			worldreport[ offset + 12 ] = _vector.y();
			worldreport[ offset + 13 ] = _vector.z()
		}
	}
	
	transferableMessage( worldreport, [worldreport.buffer] );
};
