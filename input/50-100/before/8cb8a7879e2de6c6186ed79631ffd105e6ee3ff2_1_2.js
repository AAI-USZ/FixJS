function() {
        if (this.disabled) {
            var me = this;
            //修改样式
            baidu.dom.removeClass(this.getElement('container'), 'magic-combobox-disable');
            //设置input为disable = false
            this.getElement('input').disabled = false;
            me.disabled = false;
        }
    }