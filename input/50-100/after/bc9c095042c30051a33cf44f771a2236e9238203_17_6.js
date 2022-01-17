function() {
            if ($(topnavSearchResultsContainer).find('li.selected').length) {
                document.location = $(topnavSearchResultsContainer).find('li.selected a').attr('href');
            } else {
                document.location = '/search#q=' + $.trim($('#topnavigation_search_input').val());
                $('#topnavigation_search_results').hide();
            }
        }