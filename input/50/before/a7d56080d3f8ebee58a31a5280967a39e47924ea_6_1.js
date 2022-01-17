function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg()

            morePostsBtn.show();

            renderNewPosts();
        }