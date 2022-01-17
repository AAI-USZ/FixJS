function(event){
        window.plugins.nativeUI.setTitle({title: "Главная", organize: true, refresh: true, menu: true});

        lastPages = ["#postsPage"];

        showLoader = true;
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            showLoader = false;
            $.mobile.hidePageLoadingMsg();

            morePostsBtn.show();

            renderNewPosts();
        });
        iLepra.getLastPosts();

        initCounters();
        
        // try to hide splash if needed
        window.plugins.nativeUI.hideSplash();
    }