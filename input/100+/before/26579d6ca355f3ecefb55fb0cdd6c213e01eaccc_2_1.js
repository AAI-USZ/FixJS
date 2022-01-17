function(ctxt){
			var data = ctxt.context || ctxt,
				v = ctxt[m[0]],
				i = 0;
			if(v && v.item){
				i += 1;
				if(m[i] === 'pos'){
					//allow pos to be kept by string. Tx to Adam Freidin
					return v.pos;
				}else{
					data = v.item;
				}
			}
			var n = m.length;
			for(; i < n; i++){
				if(!data){break;}
				data = data[m[i]];
			}
			return (!data && data !== 0) ? '':data;
		}