function (docId, attachmentName, callback) {
    return this.connection.rawRequest({
        method: 'GET', 
        path: '/' + [this.name, docId, attachmentName].map(querystring.escape).join('/')
    }, callback);
}