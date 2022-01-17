function(extent, projection) {
        if (typeof extent === 'undefined') {
            throw new DeveloperError('extent is required.');
        }

        Extent.validate(extent);

        if (typeof projection === 'undefined') {
            throw new DeveloperError('projection is required.');
        }

        var lla = new Cartographic2(extent.west, extent.south);
        var lowerLeft = projection.project(lla);
        lla.longitude = extent.east;
        lla.latitude = extent.north;
        var upperRight = projection.project(lla);

        var diagonal = upperRight.subtract(lowerLeft);
        return new Rectangle(lowerLeft.x, lowerLeft.y, diagonal.x, diagonal.y);
    }