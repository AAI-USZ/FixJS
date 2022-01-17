function (e) {
            var current = self.$quickSearch.val();
            if (current != self._previousQuickSearchText) {
                self._previousQuickSearchText = current;
                self.search();
            }
        }