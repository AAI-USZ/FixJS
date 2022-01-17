function build(title) {
        layerRoot.html('<textarea style="width: 100%; height: 100%;"></textarea>');
        var textarea = layerRoot.find('textarea');
        textarea.bind('blur', function (e) {
            var value = val();
            mod.onsubmit && mod.onsubmit(value);
        });
        update(data.get(status.page).getItem(status.name).getProp(status.prop));
        textarea.focus();
    }