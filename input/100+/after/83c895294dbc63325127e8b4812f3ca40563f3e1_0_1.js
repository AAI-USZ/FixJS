function(append, contentToAppend) {
            var templateData = {
                'append': false,
                'items': itemsToUpload,
                'sakai': sakai,
                'me': sakai.data.me,
                'groups': sakai.api.Groups.getMemberships(sakai.data.me.groups, true),
                'currentSelectedLibrary': currentSelectedLibrary
            };

            var $queueList = $newaddcontentContainerSelectedItemsContainer.children('ul');

            if (append && $queueList.length) {
                templateData.append = true;
                templateData.items = contentToAppend;
                $queueList.append(
                    sakai.api.Util.TemplateRenderer(newaddcontentSelectedItemsTemplate, templateData)
                );
            } else {
                $newaddcontentContainerSelectedItemsContainer.html(
                    sakai.api.Util.TemplateRenderer(newaddcontentSelectedItemsTemplate, templateData)
                );
            }
        }