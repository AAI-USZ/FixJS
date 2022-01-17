function (name, item) {
        item.click(function (e) {
            e.stopPropagation();
            focus(name);
        }).dblclick(function (e) {
            e.stopPropagation();
            edit(name);
        }).doubleTap(function (e) {
            e.stopPropagation();
            edit(name);
        });
    }