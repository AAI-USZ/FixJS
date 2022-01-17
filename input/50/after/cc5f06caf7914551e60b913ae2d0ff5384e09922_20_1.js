function () {
            this.$el.find('.stream-load-new').remove();
            this.collection.add(this.newStreamItemsCache);
            this.newStreamItemsCache = [];
            this.newItemsCount = 0;
        }