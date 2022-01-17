function() {
            input.key(37); // left
            input.key(37); // left
            Assert.areEqual('-5510px', Y.one('#scene').getStyle('top'), 'Failed to move scene when 2 minor keyboard increments');
        }