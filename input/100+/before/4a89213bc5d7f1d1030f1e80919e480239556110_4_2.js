function(child){
				if(child instanceof SwapView){
					child.destroyRecursive();
				}
			}