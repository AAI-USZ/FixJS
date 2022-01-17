function(index){
		// summary:
		//		Changes a visual cue to show the image is loaded
		// description:
		//		If 'useLoadNotifier' is set to true, then a visual cue is
		//		given to state whether the image is loaded or not.	Calling this function
		//		marks an image as loaded.
		var thumbNotifier = dojo.byId("loadingDiv_"+this.id+"_"+index);
		if(thumbNotifier){this._setThumbClass(thumbNotifier, "thumbLoaded");}
		this._loadedImages[index] = true;
	}