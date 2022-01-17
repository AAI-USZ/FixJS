function(arrayOfNodes, progressCallback, finishedCallback){
		var finishedElementCount = 0,
		    totalElementsCount = arrayOfNodes.length,
		    nodesTodo = [],
		    currentNode,
		    parentNode,
		    //make sorted lists of nodes. one list per axis sorted by bounds starts
		    sortedArraysOfNodes = this.nodeHelpers.makeSortedArrays(arrayOfNodes),
		    totalWeight = this.nodeHelpers.makeWeight(arrayOfNodes),
		    thisTree = this;

		this.i = this.nodeHelpers.makeMBV(arrayOfNodes);

		// Make root..
		this._T = this._incrementalBuild(this._makeUnfinishedNode(this.i, sortedArraysOfNodes, totalWeight));
		if(this._T.o) return finishedCallback();
		nodesTodo.push(this._T);

		if(progressCallback)
			progressCallback({phase: "Building acceleration structure...", percent: 0});

		process.nextTick(makeTree);

		function makeTree() {
			var startTime = Date.now(),
			    i;

			while(nodesTodo.length) {
				if(Date.now() - startTime > 1000) {
					if(progressCallback)
						progressCallback({percent: finishedElementCount / totalElementsCount * 100});
					return process.nextTick(makeTree);
				}
				parentNode = nodesTodo.pop();
				i = parentNode.n.length;
				while(i--) {
					currentNode = parentNode.n[i];
					if(currentNode.s) {
						currentNode = thisTree._incrementalBuild(currentNode);
						parentNode.n[i] = currentNode;
						if(currentNode.o) {
							finishedElementCount += currentNode.o.length;
						} else {
							nodesTodo.push(currentNode);
						}
					}
				}
			}
			return finishedCallback(null, thisTree);
		}
	}