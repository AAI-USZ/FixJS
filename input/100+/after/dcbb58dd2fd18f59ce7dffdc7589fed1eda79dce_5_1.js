function () {
    var data = '',
        that = this,
        packages = this.getChild('packages'),
        path = '/swallow/package';
    packages.setOverflow('auto').removeAllChildren();
    http.get({ path: path}, function (res) {
        res.on('data', function (d) {
            data += d;
        });
        res.on('end', function () {
            var jsonData = JSON.parse(data);
            forEachSortedProperty(jsonData, function (descr, name) {
                var ch = packages.addTextChild('div', name);
                ch.on('click', function () {
                    that.showHelp(name);
                }).on('mouseover', function () {
                    this.setStyleAttributes({
                        color: { r: 150, g: 150, b: 150, a: 1}
                    });
                }).on('mouseout', function () {
                    this.setStyleAttributes({ color: null});
                }).setCursor(
                    'pointer'
                ).setHtmlFlowing({
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '4px'
                });
            });
        });
        res.on('error', function (e) {
            alert('Error loading');
        });
    });
}