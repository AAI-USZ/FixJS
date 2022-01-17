function(value) {
        for (var data = this._options.items, length = data.length; length--;) {
            if (data[length].value == value) {
                this.selectValue = value;
                this.getElement('input').value = data[length].content;
                //在setup模式下，需要修改原始select的值。by Dengping
                if (this.select) {
                    this.select.options[length].selected = true;
                }
                break;
            }
        }
    }