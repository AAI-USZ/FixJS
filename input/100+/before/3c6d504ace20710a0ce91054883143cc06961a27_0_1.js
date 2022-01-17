function(number, name, code) {
    var c = $('<div class="context">'+
              '<div class="name">#'+number+': '+name+
              '</div></div>');
    for (var i = 0; i < code.length; ++i) {
        var cmd = code[i];
        var v;
        switch(cmd.op) {
        case 'call':
            v = cmd.value.name;
            break;
        case 'recurse':
            v = '';
            break;
        default:
            v = cmd.value;
            break;
        }
        c.append($('<div class="command"><span class="number">'+i+'</span> '+
                   '<span class="op">'+cmd.op+'</span>'+
                   '<span class="value">'+v+'</span></div>'));
    }
    c.hide();
    forth.dbg.elt('call-stack').prepend(c);
    c.slideDown();
    return c;
}