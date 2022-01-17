function saveGlobal() {
	config.pollution = [];

	if ( config.noglobals ) {
		for ( var key in window ) {
			if ( !hasOwn.call( window, key ) ) {
				continue;
			}
			config.pollution.push( key );
		}
	}
}