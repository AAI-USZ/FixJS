function() {
    var self = this;
    var pairs = this.model.aggregates.pluck('pair');

    var html = '<select id="pair-filter" data-placeholder="Select pairs to hide" style="width: 600px;" multiple class="chzn-select">'
    html = html + '<option value=""></option>'
    _.each(pairs, function(pair) {
      html = html + self.buildOption(pair, self.model.hiddenPairs.get(pair));
    });
    html = html + '</select>';

    return html;
  }