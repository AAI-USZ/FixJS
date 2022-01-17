function(unfinishedNode){
		var sortedArraysOfNodes = unfinishedNode.s,
		    AABB = unfinishedNode.i,
		    numberOfElements = sortedArraysOfNodes[0].length,
		    makeMBV = this.SAHHelpers.makeMBV.bind(this.SAHHelpers),
		    localWeight = unfinishedNode.w;

		if(numberOfElements <= this._maxLeaf) return this._makeLeafNode(makeMBV(sortedArraysOfNodes[0]), sortedArraysOfNodes[0]);

		var finalNodes = [],
		    subPartA = this._buildSubpart(sortedArraysOfNodes, AABB, localWeight),
		    subPartAA,
		    subPartAB,
		    subPartAAA,
		    subPartAAB,
		    subPartABA,
		    subPartABB;

		numberOfElements = subPartA.nodes[0][0].length;
		if(numberOfElements <= this._maxLeaf) {
				finalNodes.push(this._makeLeafNode(
					makeMBV (subPartA.nodes[0][0]), subPartA.nodes[0][0]));
		} else {
			subPartAA =
				this._buildSubpart(
					subPartA.nodes[0],
					makeMBV(subPartA.nodes[0][0]),
					subPartA.leftWeight);
			if(!this.use8WayNodes){
				finalNodes.push(
					this._makeUnfinishedNode(makeMBV(subPartAA.nodes[0][0]), subPartAA.nodes[0], subPartAA.leftWeight)
				);
				finalNodes.push(
					this._makeUnfinishedNode(makeMBV(subPartAA.nodes[1][0]), subPartAA.nodes[1], subPartAA.rightWeight)
				);
			} else {
				numberOfElements = subPartAA.nodes[0][0].length;
				if(numberOfElements <= this._maxLeaf) {
						finalNodes.push(
							this._makeLeafNode(makeMBV(subPartAA.nodes[0][0]), subPartAA.nodes[0][0])
						);
				} else {
					subPartAAA = this._buildSubpart(subPartAA.nodes[0], makeMBV(subPartAA.nodes[0][0]), subPartAA.leftWeight);
					finalNodes.push(
						this._makeUnfinishedNode(makeMBV(subPartAAA.nodes[0][0]), subPartAAA.nodes[0], subPartAAA.leftWeight)
					);
					finalNodes.push(
						this._makeUnfinishedNode(makeMBV(subPartAAA.nodes[1][0]), subPartAAA.nodes[1], subPartAAA.rightWeight)
					);
				}
				numberOfElements = subPartAA.nodes[1][0].length;
				if(numberOfElements <= this._maxLeaf) {
						finalNodes.push(
							this._makeLeafNode(makeMBV(subPartAA.nodes[1][0]), subPartAA.nodes[1][0])
						);
				} else {
					subPartAAB = this._buildSubpart(subPartAA.nodes[1],  makeMBV(subPartAA.nodes[1][0]), subPartAA.rightWeight);
					finalNodes.push(
						this._makeUnfinishedNode(makeMBV(subPartAAB.nodes[0][0]), subPartAAB.nodes[0], subPartAAB.leftWeight)
					);
					finalNodes.push(
						this._makeUnfinishedNode(makeMBV(subPartAAB.nodes[1][0]), subPartAAB.nodes[1], subPartAAB.rightWeight)
					);
				}
			}
		}
		numberOfElements = subPartA.nodes[1][0].length;
		if(numberOfElements <= this._maxLeaf) {
				finalNodes.push(this._makeLeafNode(makeMBV(subPartA.nodes[1][0]), subPartA.nodes[1][0]));
		} else {
			subPartAB = this._buildSubpart(subPartA.nodes[1], makeMBV(subPartA.nodes[1][0]), subPartA.rightWeight);
			if(!this.use8WayNodes){
				finalNodes.push(
					this._makeUnfinishedNode(makeMBV(subPartAB.nodes[0][0]), subPartAB.nodes[0], subPartAB.leftWeight)
				);
				finalNodes.push(
					this._makeUnfinishedNode(makeMBV(subPartAB.nodes[1][0]), subPartAB.nodes[1], subPartAB.rightWeight)
				);
			} else {
				numberOfElements = subPartAB.nodes[0][0].length;
				if(numberOfElements <= this._maxLeaf) {
						finalNodes.push(
							this._makeLeafNode(makeMBV(subPartAB.nodes[0][0]), subPartAB.nodes[0][0])
						);
				} else {
						subPartABA = this._buildSubpart(subPartAB.nodes[0],  makeMBV(subPartAB.nodes[0][0]), subPartAB.leftWeight);
						finalNodes.push(
							this._makeUnfinishedNode(makeMBV(subPartABA.nodes[0][0]), subPartABA.nodes[0], subPartABA.leftWeight)
						);
						finalNodes.push(
							this._makeUnfinishedNode(makeMBV(subPartABA.nodes[1][0]), subPartABA.nodes[1], subPartABA.rightWeight)
						);
				}

				numberOfElements = subPartAB.nodes[1][0].length;
				if(numberOfElements <= this._maxLeaf) {
						finalNodes.push(
							this._makeLeafNode(makeMBV(subPartAB.nodes[1][0]), subPartAB.nodes[1][0])
						);
				} else {
						subPartABB = this._buildSubpart(subPartAB.nodes[1],  makeMBV(subPartAB.nodes[1][0]), subPartAB.rightWeight);
						finalNodes.push(
							this._makeUnfinishedNode(makeMBV(subPartABB.nodes[0][0]), subPartABB.nodes[0], subPartABB.leftWeight)
						);
						finalNodes.push(
							this._makeUnfinishedNode(makeMBV(subPartABB.nodes[1][0]), subPartABB.nodes[1], subPartABB.rightWeight)
						);
				}
			}
		}
		return this._makeBoxNode(makeMBV(finalNodes), finalNodes);
	}