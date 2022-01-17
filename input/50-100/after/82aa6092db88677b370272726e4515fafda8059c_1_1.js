function(post){
            if(post._id == undefined){
                PostSrv.cache.remove(getCacheKey());
                PostRes.save(post, function(post) {
                    $location.path('post/' + post._id + '/edit');
                });
            }else{
                PostSrv.cache.remove(getCacheKey(post._id));

                post.update(function() {
                    $location.path('post/');
                });
            }
        }