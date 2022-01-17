function() {
            var page = Y.one('.yui3-cssfonts'),
                h = page.all('pre, code, kbd, samp, tt'),
                i = 0,
                family;

            for (i = 0; i < h.size(); i+=1) {
                family = h.item(i).getComputedStyle('fontFamily');
                Assert.areEqual('monospace', family, ' - Failed to set correct font-family for ' + h.item(i).getHTML());
            }
        }