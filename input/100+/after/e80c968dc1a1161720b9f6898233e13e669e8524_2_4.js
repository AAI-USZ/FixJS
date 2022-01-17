function (event) {
            $(selectedPhoto).data({
                scale: $(selectedPhoto).data('currentScale'), 
                currentScale: null, 
                rotation: $(selectedPhoto).data('currentRotation'),
                currentRotation: null
            });
        }