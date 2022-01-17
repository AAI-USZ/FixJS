function () {
    var packageList = this.getChild('packageList'),
        that = this;
    delete this.selected;
    packageList.removeAllChildren();
    packageList.setOverflow(['visible', 'auto']);
    forEachSortedProperty(this.packages, function (p, pn) {
        var pv = new Package({ name: pn });
        pv.setHtmlFlowing({ position: 'relative'}, true);
        packageList.addChild(pv, pn);
        pv.on('select', function (isSelected) {
            if (!isSelected) {
                that.selectPackage(pn);
            }
        });
    });
}