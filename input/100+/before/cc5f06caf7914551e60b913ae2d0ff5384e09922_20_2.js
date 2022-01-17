function (streamItem) {
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