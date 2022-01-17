function (docId, attachmentName) {
    var pathname, req;
    pathname = '/' + [this.name, docId, attachmentName].map(querystring.escape).join('/');
    return this.connection.rawRequest('GET', pathname);
}