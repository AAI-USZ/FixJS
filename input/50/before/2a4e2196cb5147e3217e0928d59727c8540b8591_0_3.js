function() {
        return "" + (this.collection.url()) + "/" + (this.get('id')) + "?timespan=" + (this.get('timespan') + this.timespanInc);
      }