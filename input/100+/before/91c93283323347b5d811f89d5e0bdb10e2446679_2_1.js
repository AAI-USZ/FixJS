function(){
    var postLimit = iLepra.config.postIncrement,
        favsList = null,
        moreFavsBtn = null;

    var renderNewPosts = function(){
        // render posts
        var p = "",
            limit = postLimit > iLepra.favouritePosts.length ? iLepra.favouritePosts.length : postLimit;

        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.favouritePosts[i]);

        favsList.empty();
        favsList.append(p);
        try{
            favsList.listview('refresh');
        }catch(e){}
    }

    // render page on creation
    $(document).on('pagecreate', "#favsPage", function(){
        lastPages = ["#favsPage"];
        
        favsList = $("#favsList");
        moreFavsBtn = $("#moreFavsButton");
    });
    $(document).on('pagebeforeshow', "#favsPage", function(){
        window.plugins.nativeUI.setTitle({title: "Избранное", organize: false, refresh: false, menu: true});
    });
    $(document).on('pageshow', "#favsPage", function(){
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
    });
}