function(){
    var postLimit = iLepra.config.postIncrement,
        mystuffList = null,
        mystuffMoreBtn = null;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.myStuffPosts.length ? iLepra.myStuffPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.myStuffPosts[i]);

        mystuffList.empty();
        mystuffList.append(p);
        try{
            mystuffList.listview('refresh');
        }catch(e){}
    }

    // render page on creation
    $(document).on('pageshow', "#mystuffPage", function(){
        window.plugins.nativeUI.setTitle({title: "Мои вещи", organize: false, refresh: false, menu: true});

        lastPages = ["#mystuffPage"];
    	
        mystuffList = $("#mystuffList");
        mystuffMoreBtn = $("#moreMystuffButton");

        $.mobile.showPageLoadingMsg();

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg()

            renderNewPosts();

            // hide button if needed
            if( postLimit < iLepra.myStuffPosts.length ){
                mystuffMoreBtn.show();
                // more posts click
                mystuffMoreBtn.bind("tap", function(e){
                    // stops event to prevent random post opening
                    e.preventDefault();
                    e.stopPropagation();

                    postLimit += postLimit;
                    if( postLimit >= iLepra.myStuffPosts.length ){
                        mystuffMoreBtn.hide();
                    }

                    // clean old data
                    renderNewPosts();
                });
            }
        });
        iLepra.getMyStuff();

        updateNewsCounts();
    });
}