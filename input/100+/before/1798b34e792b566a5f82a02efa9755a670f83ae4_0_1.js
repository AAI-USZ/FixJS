function () {
    if (typeof addAutoCompletion !== 'function') return;

    function prepareLi(li, value) {
            var name = value[0];
            li.innerHTML = '<a href="#">' + value[1] + ' (' + name + ')' + '</a>';
            li.id = 'data__' + name.replace(/\W/g, '_');
            li._value = name;
    };
    var classes = {'data_type_page' : [false, /data_type_(\w+) data_type_page/],
                   'data_type_pages': [true, /data_type_(\w+)s data_type_pages/] };
    for (var c_class in classes) {
        var pickers = getElementsByClass(c_class, document, 'label');
        for (var i = 0 ; i < pickers.length ; ++i) {
            // IE fix: http://www.quirksmode.org/bugreports/archives/2006/01/Explorer_z_index_bug.html
            pickers[i].style.zIndex = 41;
            addAutoCompletion(pickers[i].lastChild,
                           'data_page_' + pickers[i].className.match(classes[c_class][1])[1],
                           classes[c_class][0],
                           prepareLi);
        }
    }
}