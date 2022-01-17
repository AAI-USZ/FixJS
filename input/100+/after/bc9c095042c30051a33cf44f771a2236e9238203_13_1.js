function(success, template, templates) {
            if (success) {
                currentTemplate = $.extend(true, {}, template);
                currentTemplate.roles = sakai.api.Groups.getRoles(currentTemplate, true);
                getTranslatedRoles();
                templatePath = '/var/templates/worlds/' + widgetData.category + '/' + widgetData.id;
                $('.newcreategroup_template_name', $rootel).text(sakai.api.i18n.getValueForKey(currentTemplate.title));
                if (widgetData.singleTemplate === true) {
                    $newcreategroupCancelCreateButton.hide();
                }
                $newcreategroupSuggestedURLBase.text(
                    sakai.api.Util.applyThreeDots(window.location.protocol + '//' + window.location.host + '/~', 105, {
                        'middledots': true
                    }, null, true)
                );
                $newcreategroupSuggestedURLBase.attr('title', window.location.protocol + '//' + window.location.host + '/~');

                var category = false;
                for (var i = 0; i < templates.length; i++) {
                    if (templates[i].id === widgetData.category) {
                        category = templates[i];
                        break;
                    }
                }
                var defaultaccess = currentTemplate.defaultaccess || sakai.config.Permissions.Groups.defaultaccess;
                var defaultjoin = currentTemplate.defaultjoin || sakai.config.Permissions.Groups.defaultjoin;

                $('#newcreategroup_can_be_found_in option[value="' + defaultaccess + '"]', $rootel).attr('selected', 'selected');
                $('#newcreategroup_membership option[value="' + defaultjoin + '"]', $rootel).attr('selected', 'selected');

                $newcreategroupContainer.show();
                addBinding();
            } else {
                debug.error('Could not get the group template');
            }
        }