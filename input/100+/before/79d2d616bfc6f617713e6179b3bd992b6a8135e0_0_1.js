function(){
        if ( ! v.has( v.index + v.options.lookAhead ) ){
            v.getPosts( v.options.postsToRetrieve ).then( v.addPosts );
        }

        v.resurrectPosts();
        v.trimPostsAbove();

        return this;
    }