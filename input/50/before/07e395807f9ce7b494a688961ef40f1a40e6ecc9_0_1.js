function() {
            input.key(33); // up
            Assert.areEqual('10.00', output.getContent(), 'Failed to initialize dial to zero');
            Assert.areEqual('-5490px', Y.one('#scene').getStyle('top'), 'Failed to move scene when 1 major keyboard increment');
        }