function(modelItem)
{
    if (modelItem == null)
       return null;
       
    var b = this.baseSummary[modelItem.params.itemCode];
    if (b != null)
    {
        // top of the block
        var top = new ShadowElement(
            new SVGElement("path", {d:this.baseRect, fill:this.baseSummary[modelItem.params.itemCode][1], stroke:"none"}),
            true
            );

        // Only bother with the left and front vertical sides
        
        // path for the verticals gets filled out later by setHeight
        var left = new ShadowElement(
            new SVGElement("path", {fill:this.baseSummary[modelItem.params.itemCode][2], stroke:"none"}),
            true
            );        
        var front = new ShadowElement(
            new SVGElement("path", {fill:this.baseSummary[modelItem.params.itemCode][3], stroke:"none"}),
            true
            );
		
        left.hide();
        front.hide();
        
        var bottom = new ShadowElement(null, true);
        
        var highlight = new SVGElement("path", {d:this.baseRect, fill:"red", stroke:"black", opacity:0.5});

        var elements = {bottom:bottom, front:front, left:left, top:top, highlight:highlight};
        return new BlockGridViewItem(modelItem, this, elements);
    }
    else
    {
        var t = this.itemTemplates[modelItem.params.itemCode];
        if (t != null)
        {
            var state = "def";
            if (modelItem.params.state != null)
                state = modelItem.params.state;

            var dirn = "f";
            if (modelItem.params.direction != null)
                dirn = modelItem.params.direction;
                
            var currItem = new SVGElement();
    	    currItem.cloneElement(this.artwork.getElementById(t.itemName));
    	    
    	    var showInvisible = true;
    	    if (modelItem.params.isInvisible)
    	        showInvisible = false;
    	    
    	    // Set a default state and direction
    	    var stateItem = new StateDirectionShadowElement(currItem, state, dirn, showInvisible);
    	    
            return new StateGridViewItem(modelItem, this, stateItem);
        }
    }
           
    return null;
}