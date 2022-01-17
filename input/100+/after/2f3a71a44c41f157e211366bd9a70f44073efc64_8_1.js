function StateDirectionShadowElement(base, stateName, directionName, showInvisible, showInvisibleHidden)
{
    StateDirectionShadowElement.baseConstructor.call
        (this, base, showInvisible, showInvisibleHidden);   

	this.itemStates = {}; // List of all item states, and directions
	
	this.itemState = null; // Current item state
	this.stateName = null; // Current item state name
	this.itemStateDirection = null; // Current item direction
	this.directionName = null; // Current item direction name
	
	for (var i = 0; i < this.base.childNodes.length; ++i)
    {
        var currState = this.base.childNodes[i];
        if (currState.hasAttribute("state"))
		{
			var currStateName = currState.getAttribute("state");
	    	currState.removeAttribute("style"); // Hack - Inkscape will include "display=none" in the style attribute, so we need to remove it.
			currState.hide();
			this.itemStates[currStateName] = {};
			this.itemStates[currStateName].state = currState;

			// Also setup the directions for this state
			var directionSet = {};
	        for (var j = 0; j < currState.childNodes.length; ++j)
	        {
	            var currDirn = currState.childNodes[j];
	            if (currDirn.hasAttribute("direction"))
	            {
					var directionStrings = currDirn.getAttribute("direction");
	            	currDirn.removeAttribute("style"); // Hack - Inkscape will include "display=none" in the style attribute, so we need to remove it.
	            	currDirn.hide();
					for (var k = 0; k < directionStrings.length; ++k)
					{
						directionSet[directionStrings[k]] = currDirn;
					}
	            }
	        }
			this.itemStates[currStateName].directions = directionSet;
		}
    }

    this.setState(stateName, directionName);
}