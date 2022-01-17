function() {

            $('select.filter').each(function() {
                var filterValue = $(this).find('option:selected').val();
                var filterKey = $(this).data('type');
                selectedFilters[filterKey] = filterValue;
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
            theMagic(selectedFilters);
        }