function(post){
            PostSrv.cache.remove(getCacheKey());
            post.destroy(function() {
                $location.path('post/');
            });
        }