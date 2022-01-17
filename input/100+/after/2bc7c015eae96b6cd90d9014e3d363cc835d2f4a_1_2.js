function(){
		console.log('FLOW TRIGGERED WITH', arguments);
		flow._add();
		if( flow.compress )
			flow._compress();
		( config.host.provider === 'local' )
			? flow._write()
			: flow._send();

	}