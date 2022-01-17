function(toShow, toHide) {
            var $login = this.$('.login'),
                $userinfo = this.$('.userinfo'),
                wrapper = $login.parent();

            wrapper.height(wrapper.height());

            // console.log('toShow', toShow, 'height', toShow.height());
            toHide.fadeOut(function() {
                wrapper.animate({
                    height: toShow.height() + 'px'
                }, 500, function() {
                    toShow.fadeIn();
                });
            });
        }