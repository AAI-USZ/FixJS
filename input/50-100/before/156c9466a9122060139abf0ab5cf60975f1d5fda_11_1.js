function(success, data){
                // Render the list
                $("#areapermissions_content_container").html(sakai.api.Util.TemplateRenderer("areapermissions_content_template", {
                    "roles": sortedroles,
                    "visibility": visibility,
                    "manager": contextData.isManager,
                    "groupPermissions": sakai_global.group.groupData["sakai:group-visible"],
                    "sakai": sakai,
                    "area": currentArea._title,
                    "meRole": data.id
                }));
             }