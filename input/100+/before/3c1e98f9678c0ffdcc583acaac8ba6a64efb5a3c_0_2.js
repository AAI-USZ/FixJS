function EventHandler(options, scope){
    var opts = {
        locals: [],
        contained: []
    };
    $.extend(opts, options);
    for (var i = 0; i < opts.contained.length; i++){
        var container = opts.contained[i];
        container.label = Label(container.label, true);
    }
    if (opts.locals){
        for (var j = 0; j < opts.locals.length; j++){
            opts.locals[j] = Block(opts.locals[j]);
        }
    }
    opts.view = $(templates.eventhandler(opts));
    // models.push(opts);
    opts.view.data('model', opts);
    return  opts.view;
}