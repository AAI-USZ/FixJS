function( prop, val ) {

							var
								propType = prop.indexOf( "$" ) === 0 ? 1 :
									prop.indexOf( "get " ) === 0 ? 2 :
									prop.indexOf( "set " ) === 0 ? 3 :
									prop === "toString" ? 4 : 0;

							if ( propType ) {

								var
									nm = propType === 4 ? "(" + prop + ")" : ( hasAccessors = 1 ) &&
									propType === 1 ? prop.substring( 1 ) : prop.split( " " ).pop();

								if ( propType === 1 || propType === 2 || propType === 4 ) {
									parts.push(
										"Public " +
										( propType === 4 ? "Default " : "" ) + "Property Get [" + nm + "]",
										"Call VBCorrectVal(" +
										( propType === 1 ?
										copy.__get ? "me.[__get].call(me,\"" + nm + "\")" : "" :
										copy[ prop ] ? "me.[" + prop + "].call(me)" : "" ) + ",[" + nm + "])",
										"End Property"
									);
								}
								if ( propType === 1 || propType === 3 ) {
									parts.push(
										"Public Property Let [" + nm + "](val)",
										propType === 1 ?
										copy.__set ? "Call me.[__set].call(me,\"" + nm + "\",val)" : "" :
										copy[ prop ] ? "Call me.[" + prop + "].call(me,val)" : "",
										"End Property",
										"Public Property Set [" + nm + "](val)",
										propType === 1 ?
										copy.__set ? "Call me.[__set].call(me,\"" + nm + "\",val)" : "" :
										copy[ prop ] ? "Call me.[" + prop + "].call(me,val)" : "",
										"End Property"
									);
								}
							}

							if ( !propType || propType > 1 ) {
								// VBScript up to 60 multiple dimensions may be declared.
								if ( names.length === 50 ) { // flush 50 items
									parts.push( "Public [" + names.join("],[") + "]" );
									names.length = 0;
								}
								names[ names.length ] = prop;
								accessors[ accessors.length ] = prop;
							}

						}