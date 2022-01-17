function (options, callback) {
    this.request({
        method: 'POST', 
        path: '/_replicate', 
        query: options
    }, callback);
}