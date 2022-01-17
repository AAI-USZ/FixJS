function() {
            var page = Y.one('#page'),
                h = page.all('p'),
                small = parseInt(h.item(6).getStyle('fontSize'), 10),
                larger = parseInt(h.item(12).getStyle('fontSize'), 10);
            Assert.isTrue((small < larger), ' - Failed to see 100% is smaller than 123.1% in font-size');
        }