function redrawItems() {    
    var x = $('#items').empty();

    if (!listFromServer) return;

    // add a link to the parent folder
    var cf = currentFolder; // shortcut
    if (cf > '/') {
        addItem({
            label: '&uarr;&uarr;',
            url: dirname(cf).includeTrailing('/'),
            type: 'folder',
            icon: 'folder'
        });
    }
    
    // put all the items. We don't support pagination yet
    for (var i=0, a=listFromServer.items, l=a.length; i<l; ++i) {
        var o = $.extend({}, a[i]); // clone. The item will be manipulated (also inside addItem), and we don't want to make this changes persistant over changes of the view mode
        o.icon = o.type;
        addItem(o); 
    }
}