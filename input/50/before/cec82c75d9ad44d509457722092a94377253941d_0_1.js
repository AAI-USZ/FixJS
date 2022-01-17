function(items, request) {
            domClass.remove(this.chartNode, 'is-loading');
            this.processFeed(items);
            alert('b');
            this.setSize();
            this.setAxisLabelSizes();
            this.render();
        }