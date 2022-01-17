function() {
                var filterValue = $(this).find('option:selected').val();
                var filterKey = $(this).data('type');
                if(filterValue) {
                    selectedFilters[filterKey] = filterValue;
                } else {
                    categories[i] = filterKey;
                    delete selectedFilters[filterKey];
                    i++;
                }
            }