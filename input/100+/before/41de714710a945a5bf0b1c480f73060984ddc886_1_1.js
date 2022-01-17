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
        if (parents.indexOf(nodeToCheck) < 0) {
            result.push(nodeToCheck);
        }
    }

    return jQuery(result);
}