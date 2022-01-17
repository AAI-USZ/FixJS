function(event) {
	//@todo: this is debug code!
	//this.refinementCallback();
	//message: refinement done
	if (event.data.msg == 'refinementDone') {
		console.log('-----------------------------------------------------------------------');
		console.log('Message received: Refinement done for level ' + event.data.lvl);
		
		var normalBuffer = new Uint8Array(event.data.attributeBuffers[0]);
		var coordBuffer  = new Uint16Array(event.data.attributeBuffers[1]);
				
		console.log('Returned attribute buffers:');
		console.log('Coords:');
		printBuffer(coordBuffer, 16, 3);
		console.log('Normals:');
		printBuffer(normalBuffer, 8);
		console.log('-----------------------------------------------------------------------');
				
		this.refine(event.data.attributeBuffers);
	}
	//message: debug text
	else {
		console.log('Worker said:');
		console.log(event.data);
	}
 }