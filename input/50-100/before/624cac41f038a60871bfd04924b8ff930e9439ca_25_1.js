function(worldId, worldTitle){
            var requests = [];
            $(tabs).each(function(i, tab){
                requests.push({
                    "url": "/var/search/bytag.json",
                    "method": "GET",
                    "parameters": {
                        page: 0,
                        items: 3,
                        tag: "directory/" + pageData.category.replace("-", "/"),
                        category: tab.id,
                        type: "g"
                    }
                });
            });
            sakai.api.Server.batch(requests, renderWidget);
        }