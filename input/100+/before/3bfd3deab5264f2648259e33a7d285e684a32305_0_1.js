function () {
                    var img = $(this);
                    photo.css('-webkit-transform', ' rotate(' + (Math.random() * 90 - 45) + 'deg)');
                    photo.css({
                        top: Math.max(Math.random() * stage.height() - photo.height(), 0) + "px",
                        left: Math.max(Math.random() * stage.width() - photo.width(), 0) + "px",
                    });
                    photo.click(function () {
                        $(selectedPhoto).removeClass('selected');
                        $(this).addClass('selected');
                        selectedPhoto = this;
                    });
                    
                }