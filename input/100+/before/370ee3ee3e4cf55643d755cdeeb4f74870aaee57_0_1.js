function() {
                var filterValue = $(this).find('option:selected').val();
                var filterKey = $(this).data('type');
                selectedFilters[filterKey] = filterValue;
            }