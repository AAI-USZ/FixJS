function(ctxt){
			var data = ctxt.context || ctxt,
				v = ctxt[m[0]],
				i = 0;
			if(v && typeof v.item !== 'undefined'){
				i += 1;
				if(m[i] === 'pos'){
					//allow pos to be kept by string. Tx to Adam Freidin
					return v.pos;
				}else{
					data = v.item;
				}
			}
			var n = m.length,
				dm;
				
			for(; i < n; i++){
				if(!data){break;}
				dm = data[ m[i] ];
				//if it is a function call it
				data = typeof dm === 'function' ? data[ m[i] ].call( data ) : dm;
			}
			
			return (!data && data !== 0) ? '':data;
		}