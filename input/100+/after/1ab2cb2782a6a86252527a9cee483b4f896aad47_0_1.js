function(ctxt){
			var strs = [ parts[ 0 ] ],
				n = parts.length,
				fnVal, pVal, attLine, pos;
			try{
				for(var i = 1; i < n; i++){
					fnVal = fns[i].call( this, ctxt );
					pVal = parts[i];

					// if the value is empty and attribute, remove it
					if(fnVal === ''){
						attLine = strs[ strs.length - 1 ];
						if( ( pos = attLine.search( /[^\s]+=\"?$/ ) ) > -1){
							strs[ strs.length - 1 ] = attLine.substring( 0, pos );
							pVal = pVal.substr( 1 );
						}
					}

					strs[ strs.length ] = fnVal;
					strs[ strs.length ] = pVal;
				}
				return strs.join('');
			}catch(e){
				if(console && console.log){
					console.log( e.stack ? 
						e.stack : 
						e.message + ' (' + e.type + ', ' + e.arguments.join('-') + '). Use Firefox or Chromium/Chrome to get a full stack of the error. ' );
				}
				return '';
			}
		}