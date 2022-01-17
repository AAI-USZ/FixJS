function (e) {
        var checkbox;
        if (e.target.tagName === 'A') {
            return;
        } else {
            checkbox = $(e.target).siblings('input');
            checkbox.attr("checked", !checkbox.attr("checked"));
        }
    }