function() {
        if (!this.disabled) {
            var me = this;
            //修改样式
            baidu.dom.addClass(this.getElement('container'), 'magic-combobox-disable');
            //设置input为disable
            this.getElement('input').disabled = true;
            me.disabled = true;
        }
    }