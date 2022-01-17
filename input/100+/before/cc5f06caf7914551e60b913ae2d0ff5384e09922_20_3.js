function ($, _, Backbone, app, ich, StreamItemView) {
    var StreamView = Backbone.Marionette.CompositeView.extend({
        template: 'Stream',

        itemView: StreamItemView,

        className: 'stream',

        events: {
            'click #stream-load-more-button': 'onLoadMoreClicked',
            'click #stream-load-new-button': 'onLoadNewClicked'
        },

        initialize: function (options) {
            _.bindAll(this, 'onNewStreamItemReceived', 'appendHtml');

            this.newItemsCount = 0;
            this.isHomeStream = options.isHomeStream && options.isHomeStream === true ? true : false;

            this.collection.on('fetching', this.onStreamLoadingStart, this);
            this.collection.on('fetched', this.onStreamLoadingComplete, this);

            this.newStreamItemsCache = [];

            if (this.isHomeStream) {
                app.vent.on('newactivity', this.onNewStreamItemReceived);
            } else {
                app.vent.on('newactivity:observationadded newactivity:postadded newactivity:observationnoteadded' + this.model.id, this.onNewStreamItemReceived);
            }
        },

        showBootstrappedDetails: function () {
        },

        appendHtml: function (collectionView, itemView) {
            var items = this.collection.pluck('Id');
            var index = _.indexOf(items, itemView.model.id);
            log(index);

            var $li = collectionView.$el.find('.stream-list > li:eq(' + (index) + ')');

            if ($li.length === 0) {
                collectionView.$el.find('.stream-list').append(itemView.el);
            } else {
                $li.before(itemView.el);
            }
        },

        onLoadMoreClicked: function () {
            this.$el.find('.stream-load-more').remove();
            this.collection.fetchNextPage();
        },

        onLoadNewClicked: function () {
            this.$el.find('.stream-load-new').remove();
            this.collection.add(this.newStreamItemsCache);
            this.newStreamItemsCache = [];
        },

        onStreamLoadingStart: function (collection) {
            this.$el.append(ich.StreamMessage({ Text: 'Loading', ShowLoader: true }));
        },

        onStreamLoadingComplete: function (collection) {
            this.$el.find('.stream-message').remove();
            if (collection.length === 0) {
                this.$el.append(ich.StreamMessage({ Text: 'No activity yet! Start now by adding an observation.', ShowLoader: false }));
            }
            if (collection.pageInfo().next) {
                this.$el.append(ich.StreamLoadMore());
            }
        },

        onNewStreamItemReceived: function (streamItem) {
            this.$el.find('.stream-message').remove();
            var streamItemCreatedDateTime = Date.parseExact(streamItem.get('CreatedDateTime'), 'yyyy-MM-ddTHH:mm:ssZ');

            log('streamItemCreatedDateTime', streamItemCreatedDateTime);
            log('baselineDateTime', this.collection.baselineDateTime);

            // Only show a new items message if the item is newer than what we have already
            if (streamItemCreatedDateTime.isAfter(this.collection.baselineDateTime)) {
                log('is after!');
                this.newItemsCount++;
                this.newStreamItemsCache.push(streamItem);
            }

            if (this.newItemsCount > 0) {
                // Show load new items button
                if (this.$el.find('.stream-load-new').length === 0) {
                    this.$el.prepend(ich.StreamLoadNew());
                } else {
                    this.$el.find('#stream-load-new-button').val('Load ' + this.newItemsCount + ' New Items');
                }
            }
        }
    });

    return StreamView;

}