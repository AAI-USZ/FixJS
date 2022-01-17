function ScenarioPhotos (rch) {
    ScenarioBase.apply(this, arguments);
    var selectedPhoto;

    this.init = function (container) {
        var stage = container;
        var url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=graffiti nyc&rsz=8&callback=?';
        $.getJSON(url, function (data) {
            data.responseData.results.forEach(function (result, index) {
                var photo = $('<div class="photo" id="photo' 
                    + index + '"><img src="' + result.url+ '"></div>').appendTo(stage);
                $(photo).find('img').on('load', function () {
                    var rotation = (Math.random() * 90 - 45),
                        scale = Math.random() / 2 + 0.5;
                    photo.data({
                        rotation: rotation,
                        scale: scale
                    })
                    .css('-webkit-transform', 'rotate(' + rotation + 'deg) scale(' + scale + ')')
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
                });
                photo.draggable();
            });
        });

        this.addEventListener('rcjs:pinchend', function (event) {
            $(selectedPhoto).data({
                scale: $(selectedPhoto).data('currentScale'), 
                currentScale: null, 
                rotation: $(selectedPhoto).data('currentRotation'),
                currentRotation: null
            });
        });

        this.addEventListener('rcjs:pinch', function (event) {
            var scale = $(selectedPhoto).data('scale') * event.scale,
                deg = event.rotation + $(selectedPhoto).data('rotation');
            $(selectedPhoto).data({
                currentScale: scale,
                currentRotation: deg
            })
            .css('-webkit-transform', 'rotate(' + deg + 'deg) scale(' + scale + ')')
            .css('-moz-transform', 'rotate(' + deg + 'deg) scale(' + scale + ')');
        });
    }
}