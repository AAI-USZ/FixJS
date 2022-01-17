function(data, prepend) {
            // Filter out items that are already in the list
            var filteredresults = [];
            var doAnotherOne = data.results.length > 0;
            showHideLoadingContainer(false);
            $.each(data.results, function(i, result) {
                if (result.id) {
                    // Determine whether this item is already in the list
                    // by looking for an element with the same id
                    if ($('#' + result.id, $container).length === 0) {
                        filteredresults.push(result);
                    }
                }
            });
            data.results = filteredresults;
            // Render the template and put it in the container
            var templateOutput = render(data.results, data.total);
            if ($container) {
                if (prepend) {
                    $container.prepend(templateOutput);
                } else {
                    $container.append(templateOutput);
                }
                if ($.isFunction(postRenderer)) {
                    postRenderer();
                }

                isDoingExtraSearch = false;
                // If there are more results and we're still close to the bottom of the page,
                // do another one
                if (doAnotherOne) {
                    loadNextList();
                } else {
                    isDoingExtraSearch = true;
                    if ($('div:visible', $container).length === 0 && $('li:visible', $container).length === 0) {
                        if ($.isFunction(emptyListProcessor)) {
                            emptyListProcessor();
                        }
                    }
                }
            }
        }