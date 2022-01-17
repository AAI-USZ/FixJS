function ( event ) {

		event.preventDefault();

		var vector = new THREE.Vector3( ( event.clientX / container.dom.offsetWidth ) * 2 - 1, - ( event.clientY / container.dom.offsetHeght ) * 2 + 1, 0.5 );
		projector.unprojectVector( vector, camera );

		var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
		var intersects = ray.intersectObjects( scene.children );

		if ( intersects.length ) {

			signals.objectSelected.dispatch( intersects[ 0 ].object );

			// controls.enabled = false;

		} else {

			signals.objectSelected.dispatch( null );

		}

	}