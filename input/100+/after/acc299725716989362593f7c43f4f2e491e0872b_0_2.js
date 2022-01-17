function(){
            var wrapper = $('#wrapper'),
                win = $(window),

                width = wrapper.width(),
                height = wrapper.height(),

                winWidth = win.width(),
                winHeight = win.height(),

                left = ((winWidth - width) / 2),
                top = ((winHeight - height) / 2);

                wrapper.css({'top': top + 'px', 'left': left + 'px'});

            var toolkit = $('#toolkit'),
                toolkitWidth = toolkit.width(),
                toolkitLeft = (winWidth - toolkitWidth) / 2;

                toolkit.css({'left': toolkitLeft + 'px'});
        }