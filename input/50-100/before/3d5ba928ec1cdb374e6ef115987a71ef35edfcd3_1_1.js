function (v) {
      var selected = v(self.rawViewsBucketCell);
      if (selected) {
        return selected;
      }
      var buckets = v.need(DAL.cells.bucketsListCell).byType.membase;
      var bucketInfo = _.detect(buckets, function (info) {return info.name === "default"}) || buckets[0];

      return bucketInfo;
    }