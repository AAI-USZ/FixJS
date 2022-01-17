function (factory, type, cb) {
    window.open('/make/' + factory + '.' + type + '.html', '_blank');

    // for no reason that I can explain, this opens the thing in a new tab !?
/*
    this.saveGroup(factory, type, null, function (err) {
        window.open(factory + '.' + type + '.html', '_blank');
        if (cb) {
            cb(err);
        }
    });*/
}