function(i, result) {
                if (result.id) {
                    // Determine whether this item is already in the list
                    // by looking for an element with the same id
                    if ($('#' + result.id, $container).length === 0) {
                        filteredresults.push(result);
                    }
                }
            }