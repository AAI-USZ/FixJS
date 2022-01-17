function () {
            var _self = this;

            // 提前,中途设置宽度时会失败！！
            if (_self.get("width")) {
                _self.get("el").addClass(CLS_GRID_WITH);
            }

            if (_self.get("height")) {
                _self.get("el").addClass(CLS_GRID_HEIGHT);
            }

            _self._initHeader();
            _self._initBody();
            _self._initBars();
            _self._initLoadMask();
        }