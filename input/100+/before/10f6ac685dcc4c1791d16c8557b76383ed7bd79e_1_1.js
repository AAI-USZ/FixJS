function(dirData, bbqData){
            if (!dirData){
                sakai.api.Security.send404();
                return false;
            }
            // Create top level breadcrumb
            var breadcrumb = [];
            breadcrumb.push({
                "title": sakai.api.i18n.getValueForKey("ALL_CATEGORIES"),
                "id": bbqData[0],
                "link": true,
                "url": "/categories"
            });
            breadcrumb.push({
                "title": dirData.title,
                "id": dirData.id,
                "link": bbqData.length - 1
            });
            bbqData.splice(0,1);

            // Create children level breadcrumb
            var children = dirData.children[bbqData[0]];
            $.each(bbqData, function(index, item){
                breadcrumb.push({
                    "title": children.title,
                    "id": item,
                    "link": bbqData.length - 1 - index
                });
                if (children.children) {
                    children = children.children[bbqData[index]];
                }
            });

            $exploreNavigation.html(sakai.api.Util.TemplateRenderer(exploreNavigationTemplate,{"breadcrumb": breadcrumb}));
            document.title = originalTitle + " " + dirData.title;
        }