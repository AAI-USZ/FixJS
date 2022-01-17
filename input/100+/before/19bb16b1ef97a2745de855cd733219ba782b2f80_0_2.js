function () {
                    var rotation = (Math.random() * 90 - 45);
                    photo.data({
                        rotation: rotation,
                        scale: 1
                    })
                    .css('-webkit-transform', 'rotate(' + rotation + 'deg)')
                    .css('-moz-transform', ' rotate(' + rotation + 'deg)')
                    .css({
                        top: Math.max(Math.random() * stage.height() - photo.height(), 0) + "px",
                        left: Math.max(Math.random() * stage.width() - photo.width(), 0) + "px"
                    }).mousedown(function () {
                        $(selectedPhoto).removeClass('selected');
                        $(this).addClass('selected');
                        selectedPhoto = this;
                    }).click(function () {
                        $(selectedPhoto).removeClass('selected');
                        $(this).addClass('selected');
                        selectedPhoto = this;
                    }).mouseup(function () {
                        $(selectedPhoto).removeClass('selected');
                        selectedPhoto = null;
                    });
                }