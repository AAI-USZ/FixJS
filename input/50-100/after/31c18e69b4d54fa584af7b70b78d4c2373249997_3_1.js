function () {
                var _self = this,
                    totalPageItem = _self.getItem(ID_TOTAL_PAGE),
                    totalCountItem = _self.getItem(ID_TOTAL_COUNT);
                if (totalPageItem) {
                    totalPageItem.set('content', _self._getTextItemTpl(ID_TOTAL_PAGE));
                }
                _self._setCurrentPageValue(_self.get(ID_CURRENT_PAGE));
                if (totalCountItem) {
                    totalCountItem.set('content', _self._getTextItemTpl(ID_TOTAL_COUNT));
                }
            }