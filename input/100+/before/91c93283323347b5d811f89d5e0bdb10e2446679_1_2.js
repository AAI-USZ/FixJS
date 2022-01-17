function(){
    // comments loading indicator
    var commentsLoading = false,
        commentsLimit = iLepra.config.postIncrement, // pagination & display stuff
        type = "all", // all || new
        // current comment
        commentId = null,
        commentUser = null,
        // new comment pos
        newPos = -1,

        // dom
        commentsList = null,
        commentsNav = null,
        commentsNavBtns = null,
        commentsInputBar = null,
        commentsInput = null;

    var renderNewComments = function(){
        // render posts
        var p = "";

        if( type == "all" ){
            var limit = commentsLimit > iLepra.post.comments.length ? iLepra.post.comments.length : commentsLimit;
            for(var i = 0; i < limit; i++){
                p += _.template(commentTemplate, iLepra.post.comments[i]);
            }
        }else if( type == "new" ){
            var limit = commentsLimit > iLepra.post.newComments.length ? iLepra.post.newComments.length : commentsLimit;
            for(var i = 0; i < limit; i++){
                p += _.template(commentTemplate, iLepra.post.newComments[i]);
            }
        }
        commentsList.empty();
        commentsList.append(p);
        try{
            commentsList.listview('refresh');
        }catch(e){}

        if( $(".new").length > 0 ){
            commentsNav.show();
        }else{
            commentsNav.hide();
        }
    }

    var prepareCommentsButtons = function(){
        // more posts click
        $("#moreCommentsButton").bind("tap", function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            commentsLimit += commentsLimit;
            if( commentsLimit >= iLepra.post.comments.length ){
                $("#commentsButtons").hide();
            }

            // clean old data
            commentsList.empty();
            renderNewComments();
            commentsList.listview('refresh');
        });
        $("#allCommentsButton").bind("tap", function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            commentsLimit = iLepra.post.comments.length;
            $("#commentsButtons").hide();

            // clean old data
            renderNewComments();
        });
    }

    // refresh
    window.oniLepraDoRefreshPost = function(){
        if( $.mobile.activePage.attr('id') != "fullPostPage" ) return;

        // reload
        reloadComments();
    };

    $(document).on('pagebeforeshow', "#fullPostPage", function(e, ui){
        $("#postCommentsButtonsGroup").show();

        commentsList.empty();
        commentsNav.hide();
        $("#postCommentsContent").hide();
        $("#replyPost").hide();
        $("#commentsButtons").hide();

        window.plugins.nativeUI.setTitle({title: "", organize: false, refresh: true, back: true});
    });

    // on post comments show
    $(document).on('pagecreate', "#fullPostPage", function(){
        commentsLimit = iLepra.config.postIncrement;

        commentsList = $("#commentsList");
        commentsNav = $("#commentsNavBar");
        commentsNavBtns = $("#commentsNavButtons");
        commentsInputBar = $("#commentsInputBar");
        commentsInput = $("#commentInput");

        // on comments request
        $("#postCommentsButton").bind("tap", reloadComments);
        $("#postNewCommentsButton").bind("tap", function(e){
            $("#allComments").removeClass('ui-btn-active');
            $("#newComments").addClass('ui-btn-active');
            type = "new";
            reloadComments(e);
        });

        $("#allComments").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).addClass("ui-btn-active");
            $("#newComments").removeClass("ui-btn-active");
            type = "all";

            // redraw
            renderNewComments();
        });

        $("#newComments").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).addClass("ui-btn-active");
            $("#allComments").removeClass("ui-btn-active");
            type = "new";

            // redraw
            renderNewComments();
        });

        $("#replyPost").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            commentId = null;
            commentUser = null;

            showCommentAdd();
        });

        $("#prevnew").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            if(--newPos) newPos = 0;
            var com = $($("ul#commentsList li.new")[newPos]);
            if( com != null) $.mobile.silentScroll(com.offset().top);
        });

        $("#nextnew").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var newComs = $("ul#commentsList li.new");
            if( ++newPos > (newComs.length-1) ) newPos = newComs.length-1;
            var com = $(newComs[newPos]);
            if( com != null) $.mobile.silentScroll(com.offset().top);
        });

        $("#postVoteup").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).css('opacity', 1);
            $(this).next().css('opacity', 0.6);
            iLepra.post.votePost("p"+iLepra.post.current.id, "1");
        });
        $("#postVotedown").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).prev().css('opacity', 0.6);
            $(this).css('opacity', 1);
            iLepra.post.votePost("p"+iLepra.post.current.id, "-1");
        });

        // submit comment
        $("#submitComment").bind("tap", function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var commentText = commentsInput.val();

            // show loader
            $.mobile.showPageLoadingMsg();

            // on comment error
            $(document).bind(iLepra.events.error, function(event){
                // unbind
                $(document).unbind(event);
                $(document).unbind(iLepra.events.ready);
                // hide
                $.mobile.hidePageLoadingMsg();
                // show error
                iLepra.ui.showError("Ошибка добавления комментария! Попробуйте еще раз?");
            });

            // on successful comment
            $(document).bind(iLepra.events.ready, function(event){
                // unbind
                $(document).unbind(event);
                $(document).unbind(iLepra.events.error);
                // remove loader
                $.mobile.hidePageLoadingMsg();
                // clear up
                commentsInput.val('');
                commentsNavBtns.show();
                commentsInputBar.hide();
                // redraw comments
                renderNewComments();
            });

            iLepra.post.addComment(commentText, commentId);
        });

        if(iLepra.post.current.vote == 1){
            $("#postVoteup").css("opacity", 1);
        }else if(iLepra.post.current.vote == -1){
            $("#postVotedown").css("opacity", 1);
        }
    });

    // on comment option pick
    $(document).on("tap", "div.commentsMenu a.reply", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        showCommentAdd();
    });
    $(document).on("tap", "div.commentsMenu a.voteup", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $(this).css('opacity', 1);
        $(this).next().css('opacity', 0.3);
        iLepra.post.voteComment(commentId, "1");
    });
    $(document).on("tap", "div.commentsMenu a.votedown", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $(this).prev().css('opacity', 0.3);
        $(this).css('opacity', 1);
        iLepra.post.voteComment(commentId, "-1");
    });

    // show comment menu
    $(document).on("tap", "#commentsList li", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        commentId = $(this).data('id');
        commentUser = $(this).data('user');

        $(".commentsMenu").hide();
        var menu = $("div.commentsMenu", this);
        menu.show();

        var votes = $(menu.find('a')[1]);
        if( iLepra.post.current.type == "inbox" && votes.is(':visible') ){
            votes.hide().next().hide();
        }else if( !votes.is(':visible') ){
            votes.show().next().show();
        }
    });

    var reloadComments = function(e){
        if(e){
            try{
                e.preventDefault();
                e.stopImmediatePropagation();
            }catch(error){}
        }

        if(commentsLoading) return;

        // show loader
        $.mobile.showPageLoadingMsg();
        commentsLoading = true;

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.hidePageLoadingMsg();
            $("#postCommentsButtonsGroup").hide();
            $("#postCommentsContent").show();
            $("#replyPost").show();

            // render comments
            renderNewComments();

            // hide button if needed
            if( commentsLimit >= iLepra.post.comments.length ){
                $("#commentsButtons").hide();
            }else{
                prepareCommentsButtons();
            }

            commentsLoading = false;
        });

        iLepra.post.getComments();
    }

    // on add comment show
    var showCommentAdd = function(){
        commentsNav.show();
        commentsNavBtns.hide();
        commentsInputBar.show();

        if( commentUser != null ){
            commentsInput.val(commentUser+": ");
        }else{
            commentsInput.val("");
        }
    }
}