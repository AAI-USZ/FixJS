function (options, callback) {
    this.request({
        method: 'POST', 
        path: '/_replicate', 
        body: options
    }, callback);
}