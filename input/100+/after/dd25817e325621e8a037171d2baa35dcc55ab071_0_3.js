function(arrayOfNodes, deferredBuild){
		//make sorted lists of nodes. one list per axis sorted by bounds starts
		var sortedArraysOfNodes = this.nodeHelpers.makeSortedArrays(arrayOfNodes),
		    totalWeight = this.nodeHelpers.makeWeight(arrayOfNodes);

		this.i = this.nodeHelpers.makeMBV(arrayOfNodes);

		if(deferredBuild)
			this._T = this._makeUnfinishedNode(this.i, sortedArraysOfNodes, totalWeight);
		else
			this._T = this._recursiveBuild(this.i, sortedArraysOfNodes, totalWeight);
	}