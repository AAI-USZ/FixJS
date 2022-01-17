function() {
            sort.destroy();
            Assert.isTrue(sort.get('destroyed'), 'Failed to destroy the sortable instance');
            Assert.isTrue(sort.delegate.get('destroyed'), 'Failed to destroy the delegate instance');
            Assert.isTrue(sort.drop.get('destroyed'), 'Failed to destroy the drop instance');
        }