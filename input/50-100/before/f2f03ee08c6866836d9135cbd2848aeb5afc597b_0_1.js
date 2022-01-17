function(value) {
        for (var data = this._options.items, length = data.length; length--;) {
            if (data[length].value == value) {
                this.selectValue = value;
                this.getElement('input').value = data[length].content;
                break;
            }
        }
    }