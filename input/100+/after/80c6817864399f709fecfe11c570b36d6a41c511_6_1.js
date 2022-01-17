function(p) {
      var index, order, period, timeFormat, timePeriod, _base, _base1, _base2, _base3, _base4, _ref, _ref1, _ref2, _ref3, _ref4;
      this.series = {};
      p.expect('ARR').emptyElement().element();
      this.series.seriesKey = {};
      order = 1;
      while (p.moreComponents() && !/^[0-9]/.test(p.next())) {
        this.series.seriesKey[order] = p.get();
        order += 1;
      }
      if (p.moreComponents()) {
        period = p.get();
      }
      if (p.moreComponents()) {
        timeFormat = p.get();
        timePeriod = time.fromEdifactTimeValue(timeFormat, period);
      }
      index = 0;
      if (p.moreComponents()) {
        this.series.obs = {};
        this.series.obs.obsDimension = [];
        this.series.obs.obsDimension[index] = timePeriod.toString();
      }
      if (p.moreComponents()) {
        this.series.obs.obsValue = [];
        this.series.obs.obsValue[index] = +p.get();
      }
      if (p.moreComponents()) {
        this.series.obs.attributes = {};
        this.series.obs.attributes['OBS_STATUS'] = [];
        this.series.obs.attributes['OBS_STATUS'][index] = p.get();
      }
      if (p.moreComponents()) {
        this.series.obs.attributes['OBS_CONF'] = [];
        this.series.obs.attributes['OBS_CONF'][index] = p.get();
      }
      if (p.moreComponents()) {
        this.series.obs.attributes['OBS_PRE_BREAK'] = [];
        this.series.obs.attributes['OBS_PRE_BREAK'][index] = p.get();
      }
      while (p.moreElements()) {
        index += 1;
        p.element();
        this.series.obs.obsDimension.push(timePeriod.next().toString());
        if (p.moreComponents()) {
          if ((_ref = (_base = this.series.obs).obsValue) == null) {
            _base.obsValue = [];
          }
          this.series.obs.obsValue[index] = +p.get();
        }
        if (p.moreComponents()) {
          if ((_ref1 = (_base1 = this.series.obs).attributes) == null) {
            _base1.attributes = {};
          }
          if ((_ref2 = (_base2 = this.series.obs.attributes)['OBS_STATUS']) == null) {
            _base2['OBS_STATUS'] = [];
          }
          this.series.obs.attributes['OBS_STATUS'][index] = p.get();
        }
        if (p.moreComponents()) {
          if ((_ref3 = (_base3 = this.series.obs.attributes)['OBS_CONF']) == null) {
            _base3['OBS_CONF'] = [];
          }
          this.series.obs.attributes['OBS_CONF'][index] = p.get();
        }
        if (p.moreComponents()) {
          if ((_ref4 = (_base4 = this.series.obs.attributes)['OBS_PRE_BREAK']) == null) {
            _base4['OBS_PRE_BREAK'] = [];
          }
          this.series.obs.attributes['OBS_PRE_BREAK'][index] = p.get();
        }
      }
      return p.end();
    }