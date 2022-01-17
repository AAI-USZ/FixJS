function(attrs) {
      seriesCur = {
        seriesKey: {},
        attributes: {},
        obs: {
          obsDimension: [],
          obsValue: [],
          attributes: {}
        }
      };
      return seriesCur.components = _.extend({}, attrs);
    }