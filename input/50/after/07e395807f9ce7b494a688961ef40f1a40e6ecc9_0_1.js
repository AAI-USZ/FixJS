function() {
            input.key(33); // up
            Assert.areEqual('10.00', output.getContent(), 'Key "pageup" failed to increment value by major value');
            Assert.areEqual('-5490px', Y.one('#scene').getStyle('top'), 'Failed to move scene when 1 major keyboard increment');
        }