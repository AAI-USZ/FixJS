function(){
            var newpageid = sakai.api.Util.generateWidgetId();
            var neworder = sakaiDocsInStructure[currentPageShown.pageSavePath].orderedItems.length;

            var fullRef = currentPageShown.pageSavePath.split("/p/")[1] + "-" + newpageid;
            var basePath = currentPageShown.path.split("/")[0];

            var pageContent = "";
            var pageToCreate = {
                "_ref": fullRef,
                "_title": "Untitled Page",
                "_order": neworder,
                "_canSubedit": true,
                "_canEdit": true,
                "_poolpath": currentPageShown.pageSavePath,
                "main":{
                    "_ref": fullRef,
                    "_order": 0,
                    "_title": "Untitled Page",
                    "_childCount": 0,
                    "_canSubedit": true,
                    "_canEdit": true,
                    "_poolpath": currentPageShown.pageSavePath
                },
                "_childCount":1
            };
            var pageToCreate1 = {
                "_ref": newpageid,
                "_title": "Untitled Page",
                "_order": neworder,
                "_canSubedit": true,
                "_canEdit": true,
                "_poolpath": currentPageShown.pageSavePath,
                "main":{
                    "_ref": newpageid,
                    "_order": 0,
                    "_title": "Untitled Page",
                    "_childCount": 0,
                    "_canSubedit": true,
                    "_canEdit": true,
                    "_poolpath": currentPageShown.pageSavePath
                },
                "_childCount":1
            };

            pubstructure.pages[fullRef] = {};
            sakaiDocsInStructure[currentPageShown.pageSavePath][newpageid] = {};

            pubstructure.pages[fullRef].page = pageContent;
            sakaiDocsInStructure[currentPageShown.pageSavePath][newpageid].page = pageContent;

            pubstructure.items[basePath][newpageid] = pageToCreate;
            pubstructure.items[basePath]._childCount++;

            sakaiDocsInStructure[currentPageShown.pageSavePath].structure0[newpageid] = pageToCreate1;
            sakaiDocsInStructure[currentPageShown.pageSavePath].orderedItems = orderItems(sakaiDocsInStructure[currentPageShown.pageSavePath].structure0);

            renderData();
            addParametersToNavigation();
            $(window).trigger("sakai.contentauthoring.needsTwoColumns");
            $.bbq.pushState({
                "l": currentPageShown.path.split("/")[0] + "/" + newpageid,
                "newPageMode": "true"
            }, 0);
            enableSorting();
        }