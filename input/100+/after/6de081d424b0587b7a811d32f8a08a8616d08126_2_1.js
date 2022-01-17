function() {
            resetView();
            $mylibrary_items.hide();
            var query = $mylibrary_livefilter.val();
            // We only show the controls when there is a search query. 
            // All other scenarios with no items don't show the top controls
            if (!query) {
                showHideTopControls(false);
            } else {
                showHideTopControls(true);
            }
            // Determine the state of the current user in the current library
            var mode = 'user_me';
            if (sakai_global.profile && mylibrary.contextId !== sakai.data.me.user.userid) {
                mode = 'user_other';
            } else if (!sakai_global.profile && (mylibrary.isOwnerViewing || mylibrary.isMemberViewing)) {
                mode = 'group_manager_member';
            } else if (!sakai_global.profile) {
                mode = 'group';
            }
            $mylibrary_empty.html(sakai.api.Util.TemplateRenderer('mylibrary_empty_template', {
                mode: mode,
                query: query
            }));

            $mylibrary_empty.show();
        }