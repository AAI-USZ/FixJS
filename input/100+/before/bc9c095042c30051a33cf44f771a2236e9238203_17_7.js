function(){
            var searchText = $.trim($("#topnavigation_search_input").val());
            var filesUrl = sakai.config.URL.SEARCH_ALL_FILES.replace(".json", ".infinity.json");
            var usersUrl = sakai.config.URL.SEARCH_USERS;
            var groupsUrl = sakai.config.URL.SEARCH_GROUPS;
            if (searchText === "*" || searchText === "**") {
                filesUrl = sakai.config.URL.SEARCH_ALL_FILES_ALL;
                usersUrl = sakai.config.URL.SEARCH_USERS_ALL;
                groupsUrl = sakai.config.URL.SEARCH_GROUPS_ALL;
            }

            renderObj.query = searchText;
            searchText = sakai.api.Server.createSearchString(searchText);
            var requests = [];
            requests.push({
                "url": filesUrl,
                "method": "GET",
                "parameters": {
                    "page": 0,
                    "items": 3,
                    "q": searchText
                }
            });
            requests.push({
                "url": usersUrl,
                "method": "GET",
                "parameters": {
                    "page": 0,
                    "items": 3,
                    "sortOn": "lastName",
                    "sortOrder": "asc",
                    "q": searchText
                }
            });
            for (var c = 0; c < sakai.config.worldTemplates.length; c++){
                var category = sakai.config.worldTemplates[c];
                requests.push({
                    "url": groupsUrl,
                    "method": "GET",
                    "parameters": {
                        "page": 0,
                        "items": 3,
                        "q": searchText,
                        "category": category.id
                    }
                });
            }
            

            sakai.api.Server.batch(requests, function(success, data) {
                renderContent($.parseJSON(data.results[0].body));
                renderPeople($.parseJSON(data.results[1].body));
                for (var c = 0; c < sakai.config.worldTemplates.length; c++) {
                    renderGroups($.parseJSON(data.results[2 + c].body), sakai.config.worldTemplates[c].id);
                }
            }, false);
        }