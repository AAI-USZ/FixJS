function() {

            categories = [];
            i = 0;
            $('select.filter').each(function() {
                var filterValue = $(this).find('option:selected').val();
                var filterKey = $(this).data('type');
                if(filterValue) {
                    selectedFilters[filterKey] = filterValue;
                } else {
                    categories[i] = filterKey;
                    delete selectedFilters[filterKey];
                    i++;
                }
            });

            // navigate map if city
            if($(this).hasClass('cidade')) {
                var markerId = $(this).find('option:selected').val();
                if(markerId) {
                    var lat = $(this).find('option:selected').data('lat');
                    var lon = $(this).find('option:selected').data('lon');
                    navigateFilter(lat, lon, 8, markerId);
                } else {
                    navigateFilter(-2, -57, 4);
                }
            }

            if(!$.isEmptyObject(selectedFilters)) {
                updateCurrentData();
            }
            updateSelectOptions();
            theMagic();
        }