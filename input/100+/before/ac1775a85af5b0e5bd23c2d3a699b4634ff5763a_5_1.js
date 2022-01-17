function() {
            var page = Y.one('#page'),
                h = page.all('h1, h2, h3, h4, h5, h6'),
                i = 0,
                size,
                viewPort = Y.one('body').get('viewportRegion').right;

            for (i = 0; i < h.size(); i+=1) {
                //alert(h.item(i).getHTML() + 'its computed fontsize: ' + h.item(i).getComputedStyle('fontSize')  + ' ..its fontsize: ' + h.item(i).getStyle('fontSize') + ' ..viewportRegion.right: ' + Y.one('body').get('viewportRegion').right );
                /*
                Encountered a strange IE bug:
                in IE 6,7,8 (but not 9)
                a node that is H1 - H6 .getComputedStyle('fontSize') === Y.one('body').get('viewportRegion').right + 'px'
                */
                size = h.item(i).getComputedStyle('fontSize');
                Assert.isTrue(((size === '16px') || (parseInt(size) === viewPort)), ' - Failed to set correct h1 - h6 fontsizes');
            }

        }