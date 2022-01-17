function(data) {
        this._options.items = data;
        this._renderMenu();
        this._initInput();
        this.highlightIndex = -1;
        /**
         * ComboBox载入新的下拉菜单数据后触发
         * @event
         * @name magic.control.ComboBox#onrelad
         * @param {baidu.lang.Event} evt 事件参数 
         */
        this.fire('reload', {
            'data' : data
        });
    }