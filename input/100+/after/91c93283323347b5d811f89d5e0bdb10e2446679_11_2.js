function(){
    var subName = null,
        subUrl = null,
        postLimit = iLepra.config.postIncrement,

        // dom
        subsList = null,
        subpostsList = null,
        moreSubpostsBtn = null;

    var rendreNew = function(){
        // render posts
        var p = "";
        for(var i = 0; i < iLepra.sub.list.length; i++)
            p += _.template(subsTemplate, iLepra.sub.list[i]);

        subsList.append(p);
        try{
            subsList.listview('refresh');
        }catch(e){}
    }

    // render page on creation
    $(document).on('pagecreate', "#subsPage", function(){
        subsList = $("#subsList");
    });
    $(document).on('pagebeforeshow', "#subsPage", function(){
        window.plugins.nativeUI.setTitle({title: "Подлепры", organize: false, refresh: false, menu: true});

        lastPages = ["#subsPage"];
    });
    $(document).on('pageshow', "#subsPage", function(){
        if( iLepra.sub.fetch ){
            $.mobile.showPageLoadingMsg();

            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);

                // hide loading msg
                $.mobile.hidePageLoadingMsg();

                rendreNew();
            });
            iLepra.sub.getList();
        }else{
            rendreNew();
        }
    });

    // sub click
    $(document).on("tap", "a.subListItem", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        subName = $(this).children('h1').text();
        subUrl = $(this).data('link');

        $.mobile.changePage("#subpostsPage");
    });

    // render posts
    var renderNewPosts = function(){
        var limit = postLimit > iLepra.sub.posts.length ? iLepra.sub.posts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.sub.posts[i]);

        subpostsList.empty();
        subpostsList.append(p);
        try{
            subpostsList.listview('refresh');
        }catch(e){}
    }

    $(document).on('pagecreate', "#subpostsPage", function(){
        subpostsList = $("#subpostsList");
        moreSubpostsBtn = $("#moreSubpostsButton");

        // more btn
        moreSubpostsBtn.bind("tap", function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            if( postLimit < iLepra.sub.posts.length){
                postLimit += postLimit;

                // clean old data
                renderNewPosts();
            }else{ // load new data
                // show loader
                $.mobile.showPageLoadingMsg();

                // on posts data
                $(document).bind(iLepra.events.ready, function(event){
                    $(document).unbind(event);

                    // remove loader
                    $.mobile.hidePageLoadingMsg();

                    // clean old data
                    renderNewPosts();
                });

                // get posts
                iLepra.sub.getMorePosts(subUrl);
            }
        });
    });
    $(document).on('pagebeforehide', "#subpostsPage", function(){
        subpostsList.empty();
    });
    $(document).on('pagebeforeshow', "#subpostsPage", function(){
        window.plugins.nativeUI.setTitle({title: subName, organize: false, refresh: false, back: true});
    });
    $(document).on('pageshow', "#subpostsPage", function(){
        $.mobile.showPageLoadingMsg();

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();

            moreSubpostsBtn.show();

            renderNewPosts();
        });

        // get posts
        iLepra.sub.getPosts(subUrl);
    });

    window.cleansubsPage = function(){
        subsList.empty();
    };
}