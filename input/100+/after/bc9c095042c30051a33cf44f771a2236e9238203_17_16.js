function(evt) {
                var val = $.trim($(this).val());
                if (val !== '' && evt.keyCode !== 16 && val !== lastSearchVal) {
                    if (searchTimeout) {
                        clearTimeout(searchTimeout);
                    }
                    searchTimeout = setTimeout(function() {
                        sakai.api.Util.getTemplates(function(success, templates) {
                            if (success) {
                                doSearch(templates);
                                lastSearchVal = val;
                            } else {
                                debug.error('Could not get the group templates');
                            }
                        });
                    }, 200);
                } else if (val === '') {
                    lastSearchVal = val;
                    $('#topnavigation_search_results').hide();
                }
            }