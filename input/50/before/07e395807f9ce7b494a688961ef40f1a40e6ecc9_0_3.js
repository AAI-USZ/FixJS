function() {
            input.key(35); // end
            Assert.areEqual('559.00', output.getContent(), 'Home key failed to set dial to min');
            Assert.areEqual('0px', Y.one('#scene').getStyle('top'), 'Failed to move scene to show Hubble');
        }