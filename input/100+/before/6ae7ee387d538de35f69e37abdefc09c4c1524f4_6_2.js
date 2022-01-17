function() {
            var newpageid = sakai.api.Util.generateWidgetId();
            var neworder = pubstructure.orderedItems.length;

            var pageContent = {
                'rows': [{
                    'id': 'id' + Math.round(Math.random() * 100000000),
                    'columns': [{
                        'width': 1,
                        'elements': []
                    }]
                }]
            };
            var pageToCreate = {
                '_ref': newpageid,
                '_title': 'Untitled Page',
                '_order': neworder,
                '_canSubedit': true,
                '_canEdit': true,
                '_poolpath': currentPageShown.savePath,
                'main': {
                    '_ref': newpageid,
                    '_order': 0,
                    '_title': 'Untitled Page',
                    '_childCount': 0,
                    '_canSubedit': true,
                    '_canEdit': true,
                    '_poolpath': currentPageShown.savePath
                },
                '_childCount':1
            };

            pubstructure.pages[newpageid] = pageContent;
            sakaiDocsInStructure[contextData.puburl][newpageid] = pageContent;

            pubstructure.items[newpageid] = pageToCreate;
            pubstructure.items._childCount++;
            sakaiDocsInStructure[currentPageShown.savePath].structure0[newpageid] = pageToCreate;
            sakaiDocsInStructure[currentPageShown.savePath].orderedItems = orderItems(sakaiDocsInStructure[currentPageShown.savePath].structure0);

            renderData();
            addParametersToNavigation();
            $(window).trigger('sakai.contentauthoring.needsTwoColumns');
            sakai.api.Server.saveJSON(currentPageShown.savePath + '/' + newpageid + '/', pageContent, function() {
                $.bbq.pushState({
                    'l': newpageid,
                    'newPageMode': 'true'
                }, 0);
                enableSorting();
            }, true);
        }