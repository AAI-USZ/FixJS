function(AABB, sortedArraysOfNodes, localWeight){
		var numberOfElements = sortedArraysOfNodes[0].length,
		    makeMBV = this.nodeHelpers.makeMBV.bind(this.nodeHelpers),
		    finalNodes = [];

		this._makeSubpartRecursive(sortedArraysOfNodes, AABB, localWeight, finalNodes, 0);

		return this._makeBoxNode(makeMBV(finalNodes), finalNodes);
	}