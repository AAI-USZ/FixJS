function(/*Number*/index){
			// summary:
			//		Returns the index of an item widget at a given index.
			if(index === -1){ return null; }
			var view = this.getChildren()[Math.floor(index / this.numVisible)];
			return view.getChildren()[index % this.numVisible];
		}