function() {
            var hOut = parseInt(Y.one('h1').getStyle('fontSize'), 10),
                hIn = parseInt(Y.one('.yui3-cssreset h1').getStyle('fontSize'), 10);
            Assert.isTrue((hOut !== hIn), ' - Failed to set H1 in context smaller than H1 out of context');

        }