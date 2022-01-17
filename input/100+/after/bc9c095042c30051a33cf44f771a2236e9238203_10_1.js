function(success, template) {
                if (success) {
                    currentTemplate = template;
                    $deletegroup_category.html(sakai.api.i18n.getValueForKey(currentTemplate.title));
                    $deletegroup_title.html(sakai.api.Util.Security.safeOutput(data['sakai:group-title']));
                    sakai.api.Util.Modal.open($deletegroup_dialog);
                } else {
                    debug.error('Could not get the group template');
                }
            }