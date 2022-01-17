function init (container) {
        var stage = container;
        var url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=graffiti nyc&rsz=8&callback=?';
        $.getJSON(url, function (data) {
            data.responseData.results.forEach(function (result, index) {
                var photo = $('<div class="photo" id="photo' 
                    + index + '"><img src="' + result.url+ '"></div>').appendTo(stage);
                $(photo).find('img').on('load', function () {
                    var img = $(this);
                    photo.css('-webkit-transform', ' rotate(' + (Math.random() * 90 - 45) + 'deg)');
                    photo.css('-moz-transform', ' rotate(' + (Math.random() * 90 - 45) + 'deg)');
                    photo.css({
                        top: Math.max(Math.random() * stage.height() - photo.height(), 0) + "px",
                        left: Math.max(Math.random() * stage.width() - photo.width(), 0) + "px",
                    });
                    photo.click(function () {
                        $(selectedPhoto).removeClass('selected');
                        $(this).addClass('selected');
                        selectedPhoto = this;
                    });
                    
                });
                photo.draggable();
            });
        });

        rch.addEventListener('rcjs:pinch', function (event) {
            //var dir = rch.getDirection(event.angle);
            var rotation = event.rotation,
                scale = event.scale,
                deg = rotation// < 0 ? 180 + (rotation * -1) : rotation;
            $(selectedPhoto).css('-webkit-transform', 'rotate(' + deg + 'deg) scale(' + scale + ')');
            $(selectedPhoto).css('-moz-transform', 'rotate(' + deg + 'deg)');
        });

    }