function (target, options, callback) {
    if (typeof(options) === 'function') { callback = options, options = {} }
    this.connection.replicate(cradle.merge({ source: name, target: target }, options), callback);
}