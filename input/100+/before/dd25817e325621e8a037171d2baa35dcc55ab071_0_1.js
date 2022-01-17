function BVH(dimensions, leafSizeMin, leafSizeMax){
	this._Dimensions = dimensions || this._Dimensions; 
	this._minLeaf = leafSizeMin || this._minLeaf; // Minimum leaf size
	this._maxLeaf = leafSizeMax || this._maxLeaf; // Maximum leaf size

	this._T = null;  // The tree's root
	this.i = null;  // The tree's "envelope" or AABB

	this.segmentHelpers = SegmentHelpers(this._Dimensions);
	this.SAHHelpers = SAHHelpers(
		this._Dimensions,
		10,  /* = _kT - Cost per node-traversal */
		5,   /* = _kI - Cost per intersection test */
		1000, /* = _kO - Cost savings for *empty* overlapped area (higher = better) */
		1);  /* = _kB - Cost savings for balanced splits (lower = better) */
	this.nodeHelpers = NodeHelpers;
}