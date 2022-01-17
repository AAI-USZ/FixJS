function( version ){
	var prop, Obj = {};
	// support AMF0 objects
	if( version === amf.AMF0 ){
		while( prop = this.readUTF8( amf.AMF0 ) ){
			Obj[prop] = this.readValue( amf.AMF0 );
		}
		// next must be object end marker
		var end = this.readU8();
		if( end !== amf.AMF0_OBJECT_END ){
			throw new Error('Expected object end marker, got 0x'+end.toString(16) );
		}
		return Obj;
	}
	// else assume AMF3
	var Traits;
	// check if instance follows (U29O-traits)
	var n = this.readU29();
	if( n & 1 ){
		// check if trait data follows
		if( n & 2 ){
			Traits = amf.traits();
			this.refTra.push( Traits );			
			// check if traits externalizable follows (U29O-traits-ext)
			if( n & 4 ){
				Traits.clss = this.readUTF8( amf.AMF3 );
				// follows an indeterminable number of bytes
				// Extenalizable server-side class must perform custom deserialization
				// @todo Externalizable class deserializing
				throw new Error('Externalizable classes not yet supported, sorry');
			}
			else {
				Traits.dyn = Boolean( n & 8 );
				Traits.clss = this.readUTF8( amf.AMF3 );
				// iterate over declared member names
				var proplen = n >> 4;
				for( var i = 0, prop; i < proplen; i++ ){
					prop = this.readUTF8( amf.AMF3 );
					Traits.props.push( prop );
				}
			}
		}
		// else trait reference (U29O-traits-ref)
		else {
			var idx = n >> 2;
			if( this.refTra[idx] == null ){
				throw new Error("No traits reference at index "+idx+", offset "+this.i);
			}
			Traits = this.refTra[idx];
		}
		// Have traits - Construct instance
		// @todo support class mapping somehow?
		this.refObj.push( Obj );	
		for( var i = 0; i < Traits.props; i++ ){
			prop = Traits.props[i];
			Obj[prop] = this.readValue( amf.AMF3 );
		}
		// iterate over dynamic properties until empty string
		if( Traits.dyn ){
			while( prop = this.readUTF8( amf.AMF3 ) ){
				Obj[prop] = this.readValue( amf.AMF3 );
			}
		}
	} 
	// else object reference ( U29O-ref )
	else {
		var idx = n >> 1;
		if( this.refObj[idx] == null ){
			throw new Error("No object reference at index "+idx+", offset "+this.i);
		}
		Obj = this.refObj[idx];
	}
	return Obj;
}