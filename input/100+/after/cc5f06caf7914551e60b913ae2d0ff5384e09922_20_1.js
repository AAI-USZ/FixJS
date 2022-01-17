function (options) {
            _.bindAll(this, 'onNewStreamItemReceived', 'appendHtml');

            this.newItemsCount = 0;
            this.isHomeStream = options.isHomeStream && options.isHomeStream === true ? true : false;

            this.collection.on('fetching', this.onStreamLoadingStart, this);
            this.collection.on('fetched', this.onStreamLoadingComplete, this);

            this.newStreamItemsCache = [];

            app.vent.on('newactivity:observationadded newactivity:postadded newactivity:observationnoteadded', this.onNewStreamItemReceived);
        }