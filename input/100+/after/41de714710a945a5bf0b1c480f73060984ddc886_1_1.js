function() {
    var nodes = [];
    var parents = [];

    // First, copy over all matched elements to nodes and remove duplicates.
    jQuery(this).each(function(index, element) {
    	if(jQuery.inArray(element, nodes) < 0) {
    		nodes.push(element);
    	}
    });
   

    // Then, for each of these nodes, check if it is parent to some element.
    for (var i=0; i<nodes.length; i++) {
        var nodeToCheck = nodes[i];
        jQuery(this).each(function(index, element) {

            // Skip self comparisons.
            if (element == nodeToCheck) {
                return;
            }

            // Use .tagName to allow .find() to work properly.
            if((jQuery(nodeToCheck).find(element.tagName).length > 0)) {
                if (parents.indexOf(nodeToCheck) < 0) {
                    parents.push(nodeToCheck);
                }
            }
        });
    }
    
    // Finally, construct the result.
    var result = [];
    for (var i=0; i<nodes.length; i++) {
        var nodeToCheck = nodes[i];
        
        // add to result if the element is a leaf node or has different contents than its child
        if (parents.indexOf(nodeToCheck) < 0) {
        	// the element is a leaf node
            result.push(nodeToCheck);
        } else {
            // check if parent has different text than its children
        	var isDifferent = true;
            jQuery(nodeToCheck).children().each(function() {
            	var child = jQuery(this);
            	// the node is different if its text differs and the child is in the initial result set
            	if(jQuery.trim(child.text()) == jQuery.trim(jQuery(nodeToCheck).text()) && nodes.indexOf(child.get(0)) >= 0) {
            		isDifferent = false;
            	}
            });
            if(isDifferent) {
            	result.push(nodeToCheck);
            }
        }
    }

    return jQuery(result);
}