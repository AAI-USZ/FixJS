function(contextName, isGroup) {
            if (mylibrary.contextId) {
                mylibrary.default_search_text = getPersonalizedText('SEARCH_YOUR_LIBRARY');
                mylibrary.currentPagenum = 1;
                var all = state && state.all ? state.all : {};
                mylibrary.listStyle = $.bbq.getState('ls') || 'list';
                handleHashChange(null, true);
                sakai.api.Util.TemplateRenderer('mylibrary_title_template', {
                    isMe: mylibrary.isOwnerViewing,
                    isGroup: isGroup,
                    user: contextName
                }, $('#mylibrary_title_container', $rootel));
            } else {
                debug.warn('No user found for My Library');
            }
            addBinding();
        }