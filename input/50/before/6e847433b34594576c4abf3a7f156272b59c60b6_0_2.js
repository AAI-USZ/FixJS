function() {
                wrapper.animate({
                    height: toShow.height() + 'px'
                }, 500, function() {
                    toShow.fadeIn();
                });
            }