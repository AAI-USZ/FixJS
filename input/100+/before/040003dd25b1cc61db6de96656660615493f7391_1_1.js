function (feature, opt_position, opt_content) {
    var map = feature.getMap();
    if (map.mode == komoo.Mode.DRAW) return;
    var position = opt_position || feature.getCenter();
    var url, population, msg;
    if (opt_content) {
        this.title.attr('href', '#');
        this.title.text('');
        this.body.html(opt_content);
    } else {
        url = feature.getUrl();
        this.title.text(feature.getProperties().name);
        this.body.html('');

        if (feature.getProperties().type == 'Community') {
            if (feature.getProperties().population) {
                msg = ngettext('%s resident', '%s residents', feature.getProperties().population);
                population = interpolate(msg, [feature.getProperties().population])
            } else {
                population = gettext('No population provided');
            }
            this.body.html('<ul><li>' + population + '</li></ul>');
        }  else if (feature.getProperties().type == 'OrganizationBranch') {
            this.title.text(feature.getProperties().organization_name + ' - ' + feature.getProperties().name);
        }
        this.title.attr('href', url);

        if (feature.getProperties().categories) {
            var categoriesIcons = feature.getCategoriesIcons();
            var icons = '<div class="categories-icons">';
            categoriesIcons.forEach(function (icon, index, orig) {
                icons += '<img src="' + icon + '">';
            });
            icons += '</div>';
            this.body.html(this.body.html() + icons);
        }

        this.feature = feature;
    }
    var point = komoo.utils.latLngToPoint(map, position);
    point.x += 5;
    var newPosition = komoo.utils.pointToLatLng(map, point);
    this.object_.setPosition(newPosition);
    this.object_.open(map.googleMap ? map.googleMap : map);
}