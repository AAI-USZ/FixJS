function(){
                    getComments();
                    $window.trigger('sakai.entity.updatecountcache', {increment: false});
                }