function() {
            var page = Y.one('.yui3-cssfonts'),
                h = page.one('h1'),
                i = 0,
                size,
                viewPort = Y.one('body').get('viewportRegion').right - 20; // in this case the body has a margin so viewportRegion is smaller

            //alert(h.getHTML() + 'its computed fontsize: ' + h.item(i).getComputedStyle('fontSize')  + ' ..its fontsize: ' + h.item(i).getStyle('fontSize') + ' ..viewportRegion.right: ' + Y.one('body').get('viewportRegion').right );
            //alert(h.getHTML() + 'its computed fontsize: ' + h.getComputedStyle('fontSize')  + ' ..its fontsize: ' + h.getStyle('fontSize') + ' ..viewportRegion.right: ' + Y.one('body').get('viewportRegion').right );
            /*
            Encountered a strange IE bug:
            in IE 6,7,8 (but not 9)
            a node that is H1 - H6 .getComputedStyle('fontSize') === Y.one('body').get('viewportRegion').right + 'px'
            */
            size = h.getComputedStyle('fontSize');
            Assert.isTrue(((size === '13px') || (parseInt(size) > viewPort)), ' - Failed to set correct h1 - h6 fontsizes');


        }