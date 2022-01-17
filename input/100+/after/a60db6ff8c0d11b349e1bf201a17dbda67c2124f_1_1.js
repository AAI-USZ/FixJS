function( value ){
	if( this.version !== amf.AMF3 ){
		throw new Error("This library doesn't support AMF0 objects, use AMF3");
	}
	this.writeU8( amf.AMF3_OBJECT );
	// support object references
	if( value.__amfidx != null ){
		var n = ( value.__amfidx << 1 );
		return this.writeU29( n );
	}
	// else index object reference
	value.__amfidx = this.refObj.length;
	this.refObj.push( value );
	// flag with instance, no traits, no externalizable
	this.writeU29( 11 );
	// Override object type if present
	if(value['type'] != null) {
		this.writeUTF8(value['type']);
	} else {
		this.writeUTF8('Object');
	}
	// write serializable properties
	for( var s in value ){
		// skip override type parameter
		if( s != 'type' ) {
			if( typeof value[s] !== 'function' && s !== '__amfidx' ){
				this.writeUTF8( s );
				this.writeValue( value[s] );
			}
		}
	}
	// terminate dynamic props with empty string
	return this.writeUTF8('');
}