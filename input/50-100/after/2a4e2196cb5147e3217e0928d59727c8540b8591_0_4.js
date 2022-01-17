function() {
        var timespan;
        timespan = this.timespan();
        if (_.isNaN(timespan)) {
          return "" + (this.collection.url()) + "/" + (this.get('id'));
        } else {
          return "" + (this.collection.url()) + "/" + (this.get('id')) + "?timespan=" + timespan;
        }
      }