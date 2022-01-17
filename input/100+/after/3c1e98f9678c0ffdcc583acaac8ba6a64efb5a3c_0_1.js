function Context(options, scope){
    var opts = {
        contained: [],
        locals: []
    };
    $.extend(opts, options);
    for (var i = 0; i < opts.contained.length; i++){
        var container = opts.contained[i];
        container.label = Label(container.label, true);
    }
    opts.view = $(templates.context(opts));
    opts.view.data('model', opts);
    if (opts.locals){
        for (var j = 0; j < opts.locals.length; j++){
            opts.locals[j] = Expression(opts.locals[j]);
            opts.view.find('.locals').append(opts.locals[j]);
        }
    }
    return  opts.view;
}