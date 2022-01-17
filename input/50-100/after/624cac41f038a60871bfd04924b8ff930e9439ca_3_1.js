function(i, result) {
                if (result.id) {
                    // Determine whether this item is already in the list
                    // by looking for an element with the same id
                    if (!$('#' + result.id, $container).length) {
                        filteredresults.push(result);
                    }
                } else if (result.target) {
                    if (!$('#' + result.target, $container).length) {
                        filteredresults.push(result);
                    }
                }
            }