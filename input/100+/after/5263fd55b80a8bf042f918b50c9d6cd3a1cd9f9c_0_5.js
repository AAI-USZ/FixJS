function (type, opt_categories, opt_strict) {
    var komooMap = this;
    var overlays = new komoo.collections.makeFeatureCollection();
    var categories = opt_categories;
    if (!this.overlaysByType[type]) {
        return false;
    }
    if (!categories) {
        categories = [];
        $.each(this.overlaysByType[type], function (category, overlays) {
            categories.push(category);
        });
    } else if (categories.length === 0) {
        categories = ["uncategorized"];
    }
    $.each(categories, function (key, category) {
        if (komooMap.overlaysByType[type][category]) {
            komooMap.overlaysByType[type][category].forEach(function (overlay, index, orig) {
                if (!opt_strict || !overlay.getProperties().categories || overlay.getProperties().categories.length == 1) {
                    overlays.push(overlay);
                }
            });
        }
    });
    return overlays;
}