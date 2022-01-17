function(ctxt){
			var strs = [ parts[ 0 ] ],
				n = parts.length,
				fnVal, pVal, attLine, pos;

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
		}