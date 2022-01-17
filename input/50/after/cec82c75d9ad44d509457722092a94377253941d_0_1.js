function(items, request) {
            domClass.remove(this.chartNode, 'is-loading');
            this.processFeed(items);
            this.setSize();
            this.setAxisLabelSizes();
            this.render();
        }