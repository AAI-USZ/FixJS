function () {
                // find this filter again
                $.each(instance.filters, function (ind, data) {
                    if (data[0] == filter[0]) {
                        // remove it
                        instance.filters.splice(ind, 1);
                        // end the iteration; if there are duplicate filters this should
                        // only remove one of them (although it may not remove the correct one)
                        return false;
                    }
                });
                
                // re filter
                instance.getFilteredData();
                instance.sortBy(instance.sortedBy, instance.descending);

                instance.showFilters();

            }