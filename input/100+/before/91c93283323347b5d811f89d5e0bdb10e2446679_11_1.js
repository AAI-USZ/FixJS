function(){
        try{
            subpostsList.empty();
        }catch(e){};
        window.plugins.nativeUI.setTitle({title: subName, organize: false, refresh: false, back: true});

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
    }