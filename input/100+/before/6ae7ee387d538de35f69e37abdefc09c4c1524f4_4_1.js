function(currentPageShown, requiresRefresh) {
            // Bring the page back to view mode
            exitEditMode();
            $pageRootEl = $('#' + currentPageShown.ref, $rootel);
            showAddPageControls(currentPageShown.addArea);
            // Hide the revision history dialog
            if ($('#versions_container').is(':visible')) {
                $('#inserterbar_action_revision_history').trigger('click');
            }
            sakai.api.Widgets.nofityWidgetShown('#contentauthoring_widget > div:visible', false);
            $('#contentauthoring_widget > div:visible', $rootel).hide();
            // Set the path where widgets should be storing their widget data
            storePath = currentPageShown.pageSavePath + '/' + currentPageShown.saveRef + '/';
            // If the page hasn't been loaded before, or we need a refresh after cancelling the
            // page edit, we create a div container for the page
            if ($pageRootEl.length === 0 || requiresRefresh) {
                if (requiresRefresh) {
                    killTinyMCEInstances($pageRootEl);
                    // Remove the old one in case this is caused by a cancel changes option
                    $pageRootEl.remove();
                }
                // Create the new element
                $pageRootEl = $('<div>').attr('id', currentPageShown.ref);
                // Add element to the DOM
                $('#contentauthoring_widget', $rootel).append($pageRootEl);
                var pageStructure = $.extend(true, {}, currentPageShown.content);
                pageStructure.template = 'all';
                pageStructure.sakai = sakai;
                $pageRootEl.html(sakai.api.Util.TemplateRenderer('contentauthoring_widget_template', pageStructure, false, false));
                sakai.api.Widgets.widgetLoader.insertWidgets(currentPageShown.ref, false, storePath, currentPageShown.content);
            // If the page has been loaded before, we can just show it again
            } else {
                $pageRootEl.show();
                sakai.api.Widgets.nofityWidgetShown('#' + currentPageShown.ref, true);
            }

            // Determine whether or not to show the empty page placeholder
            determineEmptyPage(currentPageShown);

            // Shwow the edit page bar if I have edit permissions on this page
            if (canEditCurrentPage()) {
                $('#contentauthoring_inserterbar_container', $rootel).show();
            } else {
                $('#contentauthoring_inserterbar_container', $rootel).hide();
            }
        }