function (config) {
    var dataSpecs = config.data || [],
        self      = this;

    this.clear();

    this.set('title', config.title);
    this.set('xAxis', this.getAxis(config.xAxis));
    this.set('yAxis', this.getAxis(config.yAxis));
    this.set('showGraphGrid', config.showGraphGrid);
    this.set('showCrossHairs', config.showCrossHairs);
    this.set('showToolTipCoords', config.showToolTipCoords);

    var xMax = this.getAxis(config.xAxis).get("max");
    var yMax = this.getAxis(config.yAxis).get("max");
    var widthMultiplier = 15;
    if (parseInt(this.getAxis(config.yAxis).get("min"), 10) < 0 || parseInt(this.getAxis(config.xAxis).get("min"), 10) < 0) {
      widthMultiplier = 21;
    }
    var iTooltipWidth = (xMax + "," + yMax).length * widthMultiplier;
    var tooltipCoords = this.get("tooltipCoords"); 
    this.set("tooltipCoords", { x: 0, y: 0, top: 0, left: 0, coordOffset: 5, width: iTooltipWidth});
    this.hideToolTip();

    dataSpecs.forEach(function (dataSpec) {
      var datadefName,
          options = {},
          datadef,
          rep;

      if (SC.typeOf(dataSpec) === SC.T_STRING) {
        datadefName = dataSpec;
      }
      else {
        // TODO: parse these options somewhere other than in getNewRepresentation?
        // TODO: adopt a single idiom for passing options in the activity hash (we use an array here,
        //       hashes in different places, e.g, instead of using an idiom like
        //       { type: "HighlightedPoint", "records": [..] } we could have ["HighlightedPoint", {..}, {..}]
        //       or
        //       instead of tools: ["name":..., "setup":... } we could have  tools: ["sensor", { <setup> }]
        datadefName = dataSpec[0];
        options = dataSpec[1];
      }

      datadef = self.getDatadef(datadefName);
      rep = datadef.getNewRepresentation(options);
      self.addDataRepresentation(rep);
    }
    this.addAnnotationsByName(config.annotations);
  },
