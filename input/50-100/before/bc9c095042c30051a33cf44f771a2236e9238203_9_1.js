function(){
            // Fill up initial values in object to send to renderer
            renderObj = {
                api: sakai.api,
                groups: getSelected(),
                memberOfGroups: sakai.api.Groups.getMemberships(sakai.data.me.groups),
                worlds: sakai.config.worldTemplates
            };
            // Check if groups are part of my library
            if(!$addpeoplegroupsWidget.is(":visible")){
                getMemberships();
            } else {
                $addpeoplegroupsWidget.toggle();
            }
        }