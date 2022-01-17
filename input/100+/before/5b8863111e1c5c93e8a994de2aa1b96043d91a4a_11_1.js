function() {
            $newaddcontentContainerSelectedItemsContainer.html(sakai.api.Util.TemplateRenderer(newaddcontentSelectedItemsTemplate, {
                'items': itemsToUpload,
                'sakai': sakai,
                'me': sakai.data.me,
                'groups': sakai.api.Groups.getMemberships(sakai.data.me.groups, true),
                'currentSelectedLibrary': currentSelectedLibrary
            }));
        }