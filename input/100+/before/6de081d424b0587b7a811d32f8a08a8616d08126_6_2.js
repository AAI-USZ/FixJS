function(tuid,showSettings){

        ///////////////////
        // CSS Selectors //
        ///////////////////

        var relatedcontent = "#relatedcontent";
        var relatedcontentContainer = relatedcontent + "_container";
        var relatedcontentDefaultTemplate = relatedcontent + "_default_template";
        var relatedcontentContent = ".relatedcontent_content";
        var relatedcontentFooter = "#relatedcontent_footer";
        var relatedcontentShowMore = "#relatedcontent_show_more";
        
        var contentData = {};
        var page = 0;
        var numberofitems = 5;


        //////////////////////
        // Render functions //
        //////////////////////

        /**
         * Render the template
         */
        var renderTemplate = function(relatedcontentData){
            // Render the relatedcontent
            relatedcontentData.sakai = sakai;
            if (relatedcontentData.hasOwnProperty("relatedContent") && relatedcontentData.relatedContent.hasOwnProperty("results")) {
                for (var item in relatedcontentData.relatedContent.results) {
                    if(relatedcontentData.relatedContent.results.hasOwnProperty(item)){
                        relatedcontentData.relatedContent.results[item]["sakai:pooled-content-file-name-dotted"] = sakai.api.Util.applyThreeDots(relatedcontentData.relatedContent.results[item]["sakai:pooled-content-file-name"], $(".relatedcontent").width() - 30, {max_rows: 1,whole_word: false}, "s3d-bold");
                    }
                }
                sakai.api.Util.TemplateRenderer(relatedcontentDefaultTemplate, relatedcontentData, $(relatedcontentContainer));
                $(relatedcontentContainer).show();
            }
        };


        ////////////////////
        // Util functions //
        ////////////////////

        /**
         * This function will replace all
         * @param {String} term The search term that needs to be converted.
         */
        var prepSearchTermForURL = function(term) {
            // Filter out http:// as it causes the search feed to break
            term = term.replace(/http:\/\//ig, "");
            // taken this from search_main until a backend service can get related content
            var urlterm = "";
            var split = $.trim(term).split(/\s/);
            if (split.length > 1) {
                for (var i = 0; i < split.length; i++) {
                    if (split[i]) {
                        urlterm += split[i] + " ";
                        if (i < split.length - 1) {
                            urlterm += "OR ";
                        }
                    }
                }
            }
            else {
                urlterm = "*" + term + "*";
            }
            return urlterm;
        };

        /**
         * Fetches the related content
         */
        var getRelatedContent = function() {
            var managersList = "";
            var viewersList = "";
            var ajaxSuccess = function(data) {
                var itemsDisplayed = data.items * (page + 1);
                var moreResults = itemsDisplayed < data.total;
                $.each(data.results, function(index, item){
                    data.results[index].commentcount = sakai.api.Content.getCommentCount(item);
                    var mimeType = sakai.api.Content.getMimeType(data.results[index]);
                    var mimeTypeDescription = sakai.api.i18n.getValueForKey(sakai.config.MimeTypes["other"].description);
                    if (sakai.config.MimeTypes[mimeType]){
                        mimeTypeDescription = sakai.api.i18n.getValueForKey(sakai.config.MimeTypes[mimeType].description);
                    }
                    data.results[index].mimeTypeDescription = mimeTypeDescription;
                });
                var json = {
                    "content": contentData,
                    "relatedContent": data
                };
                renderTemplate(json);
                if (!moreResults) {
                    $(relatedcontentShowMore).hide();
                    $('#relatedcontent_footer').addClass('relatedcontent_footer_norelated');
                } else {
                    $(relatedcontentShowMore).show();
                    $('#relatedcontent_footer').removeClass('relatedcontent_footer_norelated');
                }
            };
            var ajaxError = function() {
                renderTemplate({});
            };

            for (var i = 0; i < contentData.members.managers.length; i++) {
                if (contentData.members.managers[i]) {
                    managersList += " " + (contentData.members.managers[i]["rep:userId"] || contentData.members.managers[i]["sakai:group-id"]);
                }
            }
            for (var j = 0; j < contentData.members.viewers.length; j++) {
                if (contentData.members.viewers[j]) {
                    viewersList += " " + (contentData.members.viewers[j]["rep:userId"] || contentData.members.viewers[j]["sakai:group-id"]);
                }
            }
            var searchterm = contentData.data["sakai:pooled-content-file-name"].substring(0,400) + " " + managersList + " " + viewersList;
            var searchquery = prepSearchTermForURL(searchterm);
            if (contentData.data['sakai:tags'] && contentData.data['sakai:tags'].length) {
                searchquery = searchquery + ' OR ' + contentData.data['sakai:tags'].join(' OR ');
            }

            // get related content for contentData
            // return some search results for now
            var params = {
                'items': numberofitems,
                'page': page
            };
            var url = sakai.config.URL.SEARCH_ALL_FILES.replace('.json', '.0.json');
            if (searchquery === '*' || searchquery === '**') {
                url = sakai.config.URL.SEARCH_ALL_FILES_ALL;
            } else {
                params["q"] = searchquery;
            }
            $.ajax({
                url: url,
                data: params,
                success: ajaxSuccess,
                error: ajaxError
            });
            
        };

        var showMore = function(){
            $(relatedcontentShowMore).attr('disabled','disabled');
            page++;
            getRelatedContent();
        };

        //////////////
        // Bindings //
        //////////////

        /**
         * Bind the widget's links
         */
        var addBinding = function(){
            // bind the more link
            $(relatedcontentShowMore).die("click", showMore);
            $(relatedcontentShowMore).live("click", showMore);
        };

        ////////////////////
        // Initialization //
        ////////////////////

        /**
         * Render function
         */
       $(window).bind("render.relatedcontent.sakai", function(e, data){
           page = 0;
           addBinding();
           contentData = data;
           getRelatedContent();
        });

        $(relatedcontentContent).live("click", function(){
            $.bbq.pushState($(this).attr("data-href"));
        });

        // Indicate that the widget has finished loading
        $(window).trigger("ready.relatedcontent.sakai", {});
        sakai_global.relatedcontent.isReady = true;
    }