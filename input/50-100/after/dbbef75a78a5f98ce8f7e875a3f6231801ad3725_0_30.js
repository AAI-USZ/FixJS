function(fillAmount,initialCapacity) {
	if( fillAmount === $_ ) return;
	if(initialCapacity == null) initialCapacity = 0;
	if(fillAmount == null) fillAmount = 0;
	this.renderId = 0;
	this.sectorStack = new glidias.ArrayBuffer_glidias_AABBSector();
	this.frustumStack = new glidias.AllocatorF_glidias_Frustum(glidias.Frustum.create4,fillAmount,initialCapacity);
}