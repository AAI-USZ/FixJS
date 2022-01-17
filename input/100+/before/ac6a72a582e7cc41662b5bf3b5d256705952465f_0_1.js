function (input) {
    var partitions = (function () {
        if (Array.isArray(input)) {
            return partition(input, numCPUs);
        } else {
            return [];
        }
    })();

    var defs = this.definition.reduce(function (sum, c) {
        return sum.concat(c);
    }, []);

    var that = this;
    for (var i=0; i < numCPUs; i++) {
        var p = partitions[i] || [];
        var n = cp.fork(__dirname + '/../cli.js', defs.concat(p));

        n.on('message', function (data) {
            that.emit('data', data);
        });

        this.children.push(n);
    }

    this._open = true;
}