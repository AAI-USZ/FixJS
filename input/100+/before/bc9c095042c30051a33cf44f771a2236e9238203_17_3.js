function(){
            renderObj.sakai = sakai;
            $(topnavSearchResultsContainer).html(sakai.api.Util.TemplateRenderer(searchTemplate, renderObj));
            $(topnavSearchResultsBottomContainer).html(sakai.api.Util.TemplateRenderer(searchBottomTemplate, renderObj));
            $("#topnavigation_search_results").show();
        }