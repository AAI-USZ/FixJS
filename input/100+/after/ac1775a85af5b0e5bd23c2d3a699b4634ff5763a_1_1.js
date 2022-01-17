function() {
            var hOut = Y.one('h1').getStyle('fontWeight'),
                hIn = Y.one('.yui3-cssbase h1').getStyle('fontWeight');
            Assert.isTrue((hOut !== hIn), ' - Failed to set H1 in context diff font-weight than H1 out of context');
        }