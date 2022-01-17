function BVH(dimensions, leafSizeMin, leafSizeMax, buildAlgorithm) {
	this._Dimensions = dimensions || this._Dimensions; 

	// The optimal leaf size is dependent on the user agent and model size
	// Chrome : 1-11  ?? Who knows ??
	// Firefox: ~3
	// Opera  : ~?
	// IE     : ~?

	this._minLeaf = leafSizeMin || this._minLeaf; // Minimum leaf size
	this._maxLeaf = leafSizeMax || this._maxLeaf; // Maximum leaf size

	this.treeBuilder = (buildAlgorithm || TreeBuilders.SAH)(
		this._Dimensions,
		this._maxLeaf,
		10,  /* = _kT - Cost per node-traversal */
		5,   /* = _kI - Cost per intersection test */
		10, /* = _kO - Cost savings for *empty* overlapped area (higher = better) */
		1);  /* = _kB - Cost savings for balanced splits (lower = better) */

	this._T = null; // The tree's root
	this.i = null;  // The tree's AABB

	this.segmentHelpers = SegmentHelpers(this._Dimensions);
	this.nodeHelpers = NodeHelpers(this._Dimensions);
}