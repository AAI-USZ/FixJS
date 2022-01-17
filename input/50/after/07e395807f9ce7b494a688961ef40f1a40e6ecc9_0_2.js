function() {
            input.key(37); // left
            input.key(37); // left
            Assert.areEqual('-5510px', Y.one('#scene').getStyle('top'), '2 key arrow lefts failed to move scene 2 minor keyboard increments');
        }