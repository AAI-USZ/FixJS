function() {
            var page = Y.one('.yui3-cssbase'),
                h = page.one('h1'),
                i = 0,
                size,
                sizePercent = 1.385,
                sizePx = 18,
                viewPort = Y.one('body').get('viewportRegion').right;

            size = Math.round(parseInt(h.getStyle('fontSize'), 10));
            //alert('size H1: ' + size);
            Assert.isTrue((((size - sizePx) < 1) || (Math.abs(size - (sizePercent * viewPort)) < 1)), ' - Failed on ' + h.getHTML());

        }