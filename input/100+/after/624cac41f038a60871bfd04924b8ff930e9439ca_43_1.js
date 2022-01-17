function() {

            $savecontent_save.removeAttr("disabled");

            var savecontentTop = clickedEl.offset().top + clickedEl.height() - 3;
            var savecontentLeft = clickedEl.offset().left + clickedEl.width() / 2 - 122;

            $savecontent_widget.css({
                top: savecontentTop,
                left: savecontentLeft
            });

            sakai.api.Util.getTemplates(function(success, templates) {
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
            });
        }