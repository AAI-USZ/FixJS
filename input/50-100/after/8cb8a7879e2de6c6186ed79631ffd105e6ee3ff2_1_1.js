function() {
        if (!this.disabled) {
            //修改样式
            baidu.dom.addClass(this.getElement('container'), 'magic-combobox-disable');
            //设置input为disable
            this.getElement('input').disabled = true;
            this.disabled = true;
        }
    }