function() {
            sakai.api.Util.getTemplates(function(success, templates) {
                if (success) {
                    renderObj.sakai = sakai;
                    renderObj.templates = templates;
                    $(topnavSearchResultsContainer).html(sakai.api.Util.TemplateRenderer(searchTemplate, renderObj));
                    $(topnavSearchResultsBottomContainer).html(sakai.api.Util.TemplateRenderer(searchBottomTemplate, renderObj));
                    $('#topnavigation_search_results').show();
                } else {
                    debug.error('Could not get the group templates');
                }
            });
        }