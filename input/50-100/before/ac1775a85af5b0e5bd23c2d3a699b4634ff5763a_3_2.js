function() {
            var page = Y.one('.yui3-cssfonts'),
                h = page.one('ul li'),
                family = h.getComputedStyle('fontFamily').replace(/\s/g, "");

            Assert.areEqual('arial,helvetica,clean,sans-serif', family, ' - Failed to set correct h1 - h6 fontsizes');

        }