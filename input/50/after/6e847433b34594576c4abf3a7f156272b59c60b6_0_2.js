function() {
                // wrapper.height(toShow.height());
                wrapper.animate({
                    height: toShow.height() + 'px'
                }, 500, function() {
                    toShow.fadeIn(function() {
                        toShow.unwrap();
                    });
                });
            }