function(chain){ // this is "after" chain
			var l = chain.length, f;
			return !l ? 0 : l == 1 ?
				(f = chain[0], function(){
					f.apply(this, arguments);
				}) :
				function(){
					for(var i = 0; i < l; ++i){
						chain[i].apply(this, arguments);
					}
				};
		}