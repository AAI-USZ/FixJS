function () {
                console.log('pop ' + ind);
                instance.filters.splice(ind, 1);
                
                // re filter
                instance.getFilteredData();
                instance.sortBy(instance.sortedBy, instance.descending);

                instance.showFilters();

            }