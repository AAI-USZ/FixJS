function(success, templates) {
                if (success) {
                    var json = {
                        'files': contentObj.data,
                        'context': contentObj.context,
                        'libraryHasIt': contentObj.libraryHasIt,
                        'groups': contentObj.memberOfGroups,
                        'sakai': sakai,
                        'templates': templates
                    };
                    $savecontent_container.html(sakai.api.Util.TemplateRenderer("#savecontent_template", json));
                    enableDisableAddButton();
                    $savecontent_widget.jqmShow();
                } else {
                    debug.error('Could not get the group templates');
                }
            }