function(e, ui){
        $("#postCommentsButtonsGroup").show();

        commentsList.empty();
        commentsNav.hide();
        $("#postCommentsContent").hide();
        $("#replyPost").hide();
        $("#commentsButtons").hide();

        window.plugins.nativeUI.setTitle({title: "", organize: false, refresh: true, back: true});
    }