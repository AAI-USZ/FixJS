function() {
                currentTemplate = $.extend(true, {}, sakai.api.Groups.getTemplate(widgetData.category, widgetData.id));
                if ( $.isEmptyObject( currentTemplate ) && sakai_global.group && sakai_global.group.groupData && sakai_global.group.groupData[ "sakai:roles" ]) {
                    var groupData = $.extend( true, {}, sakai_global.group.groupData );
                    groupData.roles = $.parseJSON(sakai_global.group.groupData[ "sakai:roles" ] );
                    currentTemplate.roles = sakai.api.Groups.getRoles( groupData, true );
                    currentTemplate.joinRole = groupData["sakai:joinRole"];
                } else if ( !$.isEmptyObject( currentTemplate ) ){
                    currentTemplate.roles = sakai.api.Groups.getRoles(currentTemplate, true);
                } else {
                    debug.error( "Unable to find any suitable roles" );
                }

                $("#addpeople_selected_all_permissions", $rootel).html(sakai.api.Util.TemplateRenderer("addpeople_selected_permissions_template", {"roles": currentTemplate.roles,"sakai": sakai}));
            }