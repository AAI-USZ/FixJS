function(/*typeCode, */id, listener){
				_.assertLength(arguments, 2)
				//lazyArray(lazyObj(byObject, typeCode), id).push(listener);
				lazyArray(byObject, id).push(listener);
			}