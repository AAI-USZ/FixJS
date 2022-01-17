function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();

            renderNewPosts();

            // hide button if needed
            if( postLimit < iLepra.inboxPosts.length ){
                moreInboxBtn.show();
                // more posts click
                moreInboxBtn.bind("tap", function(event){
                    // stops event to prevent random post opening
                    event.preventDefault();
                    event.stopPropagation();

                    postLimit += postLimit;
                    if( postLimit >= iLepra.inboxPosts.length ){
                        moreInboxBtn.hide();
                    }

                    // clean old data
                    renderNewPosts();
                });
            }
        }