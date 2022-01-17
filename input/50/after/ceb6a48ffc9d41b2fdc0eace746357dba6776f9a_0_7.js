function (callback /* (version: number) */) {
    this.execCommand('host:version', function (data) {
        callback(decodeNumber(data));
    });
}