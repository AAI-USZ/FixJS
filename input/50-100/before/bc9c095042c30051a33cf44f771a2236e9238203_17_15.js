function(evt){
                var val = $.trim($(this).val());
                if (val !== "" && evt.keyCode !== 16 && val !== lastSearchVal) {
                    if (searchTimeout) {
                        clearTimeout(searchTimeout);
                    }
                    searchTimeout = setTimeout(function() {
                        doSearch();
                        lastSearchVal = val;
                    }, 200);
                } else if (val === "") {
                    lastSearchVal = val;
                    $("#topnavigation_search_results").hide();
                }
            }