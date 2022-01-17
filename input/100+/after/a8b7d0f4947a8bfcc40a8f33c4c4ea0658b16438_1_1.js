function() {
  var self = this;
  var url = this.url.hash_to_url();
  
  if (!this.url.hasFilter()) {
    this.filter(this.defaultFilter);
    return;
  }

  $.getJSON(url, null, function(result){ 
    self.renderDataCallBack(result.data);
    var currentState = ResourceTable.ParseUrlRailsStyle(self.url.query);
    currentState.paginationSummary = self.pagination.generate(result);
    self.renderViewCallBack(currentState);
  });
}