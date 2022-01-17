function (packageName) {
    var data = '',
        that = this,
        help = this.getChild('help'),
        pName = this.getChild('packageName'),
        helpPath = '/swallow/make/' + packageName + '/' + packageName + '.dox.json';
    help.setOverflow('auto');
    help.removeAllChildren();
    http.get({ path: helpPath}, function (res) {
        res.on('data', function (d) {
            data += d;
        });
        res.on('end', function () {
            var jsonData = JSON.parse(data);
            help.addTextChild(
                'div'
            ).setHtmlFlowing({
                paddingLeft: '10px',
                paddingRight: '10px'
            }).setInnerHTML(
                doxhtml.jsonToHtml(jsonData)
            );
            pName.setText(packageName);
        });
        res.on('error', function (e) {
            alert('Error loading');
        });
    });
}