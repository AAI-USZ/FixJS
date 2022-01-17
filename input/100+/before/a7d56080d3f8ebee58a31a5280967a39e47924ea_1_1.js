function(){
        window.plugins.nativeUI.setTitle({title: "Избранное", organize: false, refresh: false, menu: true});

        lastPages = ["#favsPage"];
    	
        favsList = $("#favsList");
        moreFavsBtn = $("#moreFavsButton");

        $.mobile.showPageLoadingMsg();

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();

            renderNewPosts();

            // hide button if needed
            if( postLimit < iLepra.favouritePosts.length ){
                moreFavsBtn.show();
                // more posts click
                moreFavsBtn.bind("tap", function(event){
                    // stops event to prevent random post opening
                    event.preventDefault();
                    event.stopPropagation();

                    postLimit += postLimit;
                    if( postLimit >= iLepra.favouritePosts.length ){
                        moreFavsBtn.hide();
                    }

                    // clean old data
                    renderNewPosts();
                });
            }
        });
        iLepra.getFavourites();
    }