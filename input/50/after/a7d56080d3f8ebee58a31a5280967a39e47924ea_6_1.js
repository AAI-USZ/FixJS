function(event){
            $(document).unbind(event);

            // hide loading msg
            showLoader = false;
            $.mobile.hidePageLoadingMsg();

            morePostsBtn.show();

            renderNewPosts();
        }