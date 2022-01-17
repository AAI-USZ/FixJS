function(){
    var postLimit = iLepra.config.postIncrement,
        postsList = null,
        morePostsBtn = null,
        showLoader = true;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.latestPosts.length ? iLepra.latestPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.latestPosts[i]);

        postsList.empty();
        postsList.append(p);
        try{
            postsList.listview('refresh');
        }catch(e){}
    }

    ////// LAYOUT STUFF
    var prepareLayoutReadyEvent = function(){
        // show loader
        $.mobile.showPageLoadingMsg();

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.hidePageLoadingMsg();

            // clean old data & render
            renderNewPosts();

        });
    }

    $(document).on("pagebeforechange", function(e, ui){
        if( $.mobile.activePage && !ui.options.reverse ){
            var id = "#"+$.mobile.activePage.attr('id');
            if( lastPages.indexOf(id) == -1 ) lastPages.push(id);
        }
    })

    // render page on creation
    $(document).on('pagecreate', "#postsPage", function(event){
        postsList = $("#postsList");
        morePostsBtn = $("#morePostsButton");

        // more posts
        morePostsBtn.bind("tap", function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            if( postLimit < iLepra.latestPosts.length){
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
                iLepra.getMorePosts();
            }
        });

        $("#postsMain").bind("tap", function(){
            prepareLayoutReadyEvent();
            iLepra.switchLayout(1);
        });
        $("#postsAll").bind("tap", function(){
            prepareLayoutReadyEvent();
            iLepra.switchLayout(0);
        });
        $("#postsSub").bind("tap", function(){
            prepareLayoutReadyEvent();
            iLepra.switchLayout(2);
        });
    });
    $(document).on('pagebeforeshow', "#postsPage", function(event){
        window.plugins.nativeUI.setTitle({title: "Главная", organize: true, refresh: true, menu: true});

        lastPages = ["#postsPage"];

        initCounters();
        
        // try to hide splash if needed
        window.plugins.nativeUI.hideSplash();
    });
    $(document).on('pageshow', "#postsPage", function(event){
        $.mobile.showPageLoadingMsg();

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            showLoader = false;
            $.mobile.hidePageLoadingMsg();

            morePostsBtn.show();

            renderNewPosts();
        });
        iLepra.getLastPosts();
    });
    
    // refresh
    window.oniLepraDoRefreshPosts = function(){
        if( $.mobile.activePage.attr('id') != "postsPage" ) return;

        // show loader
        $.mobile.showPageLoadingMsg();

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.hidePageLoadingMsg();

            // clean old data & render
            renderNewPosts();
        });

        // get posts
        iLepra.getLastPosts(true);
    };

    // show full post
    $(document).on("tap", "a.postListItem", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        currentPostId = $(this).data('id');

        // get selected post
        if( $.mobile.activePage.attr('id') == "postsPage" ){
            for(var i in iLepra.latestPosts){
                if(iLepra.latestPosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.latestPosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "mystuffPage" ){
            for(var i in iLepra.myStuffPosts){
                if(iLepra.myStuffPosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.myStuffPosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "inboxPage" ){
            for(var i in iLepra.inboxPosts){
                if(iLepra.inboxPosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.inboxPosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "favsPage" ){
            for(var i in iLepra.favouritePosts){
                if(iLepra.favouritePosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.favouritePosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "subpostsPage"){
            for(var i in iLepra.sub.posts){
                if(iLepra.sub.posts[i].id == currentPostId){
                    iLepra.post.current = iLepra.sub.posts[i];
                    break;
                }
            }
        }
        
        $.mobile.changePage("#fullPostPage");
    });

    // render full post text
    $(document).on('pagebeforeshow', "#fullPostPage", function(){
        // render html
        $("#postContent").html(iLepra.post.current.body);

        // render additional info
        $("#postUser").text(iLepra.post.current.user);
        $("#postComments").text(iLepra.post.current.comments);
        $("#postTime").text(iLepra.post.current.when);
        $("#postRating").text(iLepra.post.current.rating);
    });
}