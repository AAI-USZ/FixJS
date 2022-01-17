function(index) {
        var item = this._options.items[index] || this._options.items[0];
        this.getElement('input').value = item.content;
        this.selectValue = item.value;
        //在setup模式下，需要修改原始select的值。by Dengping
        if (this.select) {
            this.select.options[index].selected = true;
        }
    }