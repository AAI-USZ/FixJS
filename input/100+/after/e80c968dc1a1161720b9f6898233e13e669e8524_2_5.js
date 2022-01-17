function (event) {
            var scale = $(selectedPhoto).data('scale') * event.scale,
                deg = event.rotation + $(selectedPhoto).data('rotation');
            $(selectedPhoto).data({
                currentScale: scale,
                currentRotation: deg
            })
            .css('-webkit-transform', 'rotate(' + deg + 'deg) scale(' + scale + ')')
            .css('-moz-transform', 'rotate(' + deg + 'deg) scale(' + scale + ')');
        }