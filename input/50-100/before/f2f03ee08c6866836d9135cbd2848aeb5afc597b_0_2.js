function(index) {
        var item = this._options.items[index] || this._options.items[0];
        this.getElement('input').value = item.content;
        this.selectValue = item.value;
    }