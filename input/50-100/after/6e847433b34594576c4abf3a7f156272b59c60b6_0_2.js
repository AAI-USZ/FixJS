function(toShow, toHide) {
            toHide.wrap('<div></div>');
            var wrapper = toHide.parent();
            toShow.appendTo(wrapper);

            wrapper.height(wrapper.height());

            // console.log('toShow', toShow, 'height', toShow.height());
            toHide.fadeOut(function() {
                // wrapper.height(toShow.height());
                wrapper.animate({
                    height: toShow.height() + 'px'
                }, 500, function() {
                    toShow.fadeIn(function() {
                        toShow.unwrap();
                    });
                });
            });
        }