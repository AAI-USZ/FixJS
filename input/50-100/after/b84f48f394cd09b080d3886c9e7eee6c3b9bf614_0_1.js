function (color, size) {
        var box = $('\u003cdiv\u003e\u003c/div\u003e');
        box.css('background-color', color);
        box.css('width', size + 'px');
        box.css('height', size + 'px');
        this._jqBody.append(box);
    }