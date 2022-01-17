function (callback) {
    console.log('getting version');

    this.execCommand('host:version', function (data) {
        callback(decodeNumber(data));
    });
}