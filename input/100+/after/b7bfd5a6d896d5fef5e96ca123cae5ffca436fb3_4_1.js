function(){
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
    }