function (e) {
            var current = self.$quickSearch.val();
            if (e.keyCode != 13 && current != self._previousQuickSearchText) {
                self._previousQuickSearchText = current;
                self.search();
            }
        }