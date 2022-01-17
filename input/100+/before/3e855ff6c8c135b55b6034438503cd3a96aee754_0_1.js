function() {
	var i, offset,
		dp = world.getDispatcher(),
		num = dp.getNumManifolds(),
		manifold, num_contacts, j, pt,
		_collided = false;
	
	if ( collisionreport.length < 2 + num * COLLISIONREPORT_ITEMSIZE ) {
		collisionreport = new Float32Array(collisionreport.length + REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE); // message id + # of objects to report + chunk size * # of values per object
		collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;
	}
	
	collisionreport[1] = 0; // how many collisions we're reporting on
	
	for ( i = 0; i < num; i++ ) {
		manifold = dp.getManifoldByIndexInternal( i );
		
		num_contacts = manifold.getNumContacts();
		if ( num_contacts == 0 ) continue;
		
		for ( j = 0; j < num_contacts; j++ ) {
			pt = manifold.getContactPoint( j );
			//if ( pt.getDistance() < 0 ) {
				offset = 2 + (collisionreport[1]++) * COLLISIONREPORT_ITEMSIZE;
				collisionreport[ offset ] = _objects_ammo[ manifold.getBody0() ];
				collisionreport[ offset + 1 ] = _objects_ammo[ manifold.getBody1() ];
				break;
			//}
		}
	}
	
	transferableMessage( collisionreport, [collisionreport.buffer] );
}