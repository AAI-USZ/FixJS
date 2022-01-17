function(description) {
        var desc = description || {};
        var instance = desc.instance || 'arcgis/rest';

        if (!desc.host) {
            throw new DeveloperError('description.host is required.');
        }

        if (!desc.service) {
            throw new DeveloperError('description.service is required.');
        }

        this._url = 'http://' + desc.host + '/' + instance + '/services/';

        if (desc.folder) {
            this._url += desc.folder + '/';
        }

        this._url += desc.service + '/MapServer';

        /**
         * The ArcGIS Server host name.
         * @type {String}
         */
        this.host = desc.host;

        /**
         * The instance name. The default value is '/arcgis/rest'.
         * @type {String}
         */
        this.instance = instance;

        /**
         * The folder where the service is located.
         * @type {String}
         */
        this.folder = desc.folder;

        /**
         * The service name.
         * @type {String}
         */
        this.service = desc.service;

        this._proxy = desc.proxy;

        // TODO: Get this information from the server

        /**
         * The cartographic extent of the base tile, with north, south, east and
         * west properties in radians.
         *
         * @type {Extent}
         */
        this.maxExtent = new Extent(
            -CesiumMath.PI,
            CesiumMath.toRadians(-85.05112878),
            CesiumMath.PI,
            CesiumMath.toRadians(85.05112878)
        );

        /**
         * The width of every image loaded.
         *
         * @type {Number}
         */
        this.tileWidth = 256;

        /**
         * The height of every image loaded.
         *
         * @type {Number}
         */
        this.tileHeight = 256;

        /**
         * The maximum zoom level that can be requested.
         *
         * @type {Number}
         */
        this.zoomMax = 19;

        /**
         * The minimum zoom level that can be requested.
         *
         * @type {Number}
         */
        this.zoomMin = 0;

        /**
         * The map projection of the image.
         *
         * @type {Enumeration}
         * @see Projections
         */
        this.projection = Projections.MERCATOR;

        this._logo = undefined;
        this._logoLoaded = false;

        var that = this;
        jsonp(this._url, {
            parameters : {
                f : 'json'
            },
            proxy : this._proxy
        }).then(function(data) {
            var credit = data.copyrightText;

            var canvas = document.createElement('canvas');
            canvas.width = 800.0;
            canvas.height = 20.0;

            var context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            context.font = '12px sans-serif';
            context.textBaseline = 'top';
            context.fillText(credit, 0, 0);

            that._logo = canvas;
            that._logoLoaded = true;
        });
    }