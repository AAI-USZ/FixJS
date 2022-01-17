function (series, typeKey) {
    var
      type = series[typeKey],
      graphType = this[typeKey],
      options = {
        context     : this.ctx,
        width       : this.plotWidth,
        height      : this.plotHeight,
        fontSize    : this.options.fontSize,
        fontColor   : this.options.fontColor,
        textEnabled : this.textEnabled,
        htmlText    : this.options.HtmlText,
        text        : this._text, // TODO Is this necessary?
        data        : series.data,
        color       : series.color,
        shadowSize  : series.shadowSize,
        xScale      : _.bind(series.xaxis.d2p, series.xaxis),
        yScale      : _.bind(series.yaxis.d2p, series.yaxis)
      };

    options = flotr.merge(type, options);

    // Fill
    options.fillStyle = this.processColor(
      type.fillColor || series.color,
      {opacity: type.fillOpacity}
    );

    return options;
  }