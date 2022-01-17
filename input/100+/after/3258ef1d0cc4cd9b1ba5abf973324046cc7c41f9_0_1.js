function(seconds) {
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(mousePosition.x, mousePosition.y);
        
        for (var i = 0; i < relatedPages.length; i++) {
            var page = relatedPages[i];
        
            if (moveAnimationRemaining > 0) {
                page.highlighted = false;
            } else {
                var result = GL.Raytracer.hitTestSphere(tracer.eye, ray, page.position, page.hitSize);
                if (result) {
                    page.highlighted = true;
                } else {
                    page.highlighted = false;
                }
            }

            page.update(seconds);

            page.alpha = Math.min(1, page.alpha + seconds / planetFadeInDuration);
        }
        
        moveAnimationRemaining = Math.max(moveAnimationRemaining - seconds, 0);
        if (moveAnimationRemaining == 0) {
            moveAnimationRemaining = 0;
            moveDestination = null;
            
            if (nextRelatedPages.length > 0) {
                useNewPages();
            } else {
                // ???
            }
        }
    }