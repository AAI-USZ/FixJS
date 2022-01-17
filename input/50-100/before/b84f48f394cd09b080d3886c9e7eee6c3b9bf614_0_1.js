function (color, size) {
        var box = $('<div></div>');
        box.css('background-color', color);
        box.css('width', size + 'px');
        box.css('height', size + 'px');
        this._jqBody.append(box);
    }