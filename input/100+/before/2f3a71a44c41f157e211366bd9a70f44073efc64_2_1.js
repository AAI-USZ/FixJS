function GridItem(params)
{
    GridItem.baseConstructor.call(this);
    this.src = "GridItem";

    this.params = (params == null) ? {} : params;
	this.params.saveVals = {};
	
    if (this.params.ht == null)
        this.params.ht = 0; 
    if (this.params.elev == null)
        this.params.elev = 0; 
    if (this.params.blockView == null)
        this.params.blockView = false; 
    if (this.params.povRange == null)
        this.params.povRange = 0; 
    if (this.params.isTemporary == null)
        this.params.isTemporary = false; 
    if (this.params.canStandOn == null)
        this.params.canStandOn = false; 
    if (this.params.isInvisible == null)
        this.params.isInvisible = false; 
	if (this.params.isHighlighted == null)
		this.params.isHighlighted = false;
		
    this.cellContents = null; // doesn't belong to anything yet
    this.canSee = {}; // Can't see anything yet
}