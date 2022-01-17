function(success, templates) {
            if (success) {
                $.each(templates, function(index, item) {
                    tabs.push({
                        id: item.id,
                        title: sakai.api.i18n.getValueForKey(item.titlePlural)
                    });
                });
                fetchWorldData();
            } else {
                debug.error('Could not get the group templates');
            }
        }