function(orp, oip, zIndex)
{
	this.parent = null;
	this.orp = orp;
	this.zIndex = zIndex;
	this.children = new SortedList("zIndex");
	this.lastUsedTransform = new Transform();
	this.rendered = true;
	
	if( oip != null ) {
		this.oip = oip;
	}
	else {
		this.oip = new ObjectInteractionParameters(false);
	}
}