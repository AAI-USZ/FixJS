function _initiateScroller(page) {
        if (page && scrollerOnPage != page) {
            if (settingsScroller) _destroyScroller();
            
            settingsScroller = createScroller(settings.find('.settings_body ' + page));
            scrollerOnPage = page;
            $j(window).orientationChange( function() { _initiateScroller(); } );
        } else if (settingsScroller) {
            settingsScroller.refresh();
        }
    }