function() {
  var tableView = this.tableView;
  
  var viewStack = tableView.getViewStack();
  if (!viewStack) return;
  
  var view = tableView.getView();
  if (!view) return;
  
  var data = this.getData();
  if (!data) return;
  
  var childDataSource = new Pushpop.TableViewDataSource(data.childDataSource);
  
  var self = this;
  
  // Push a new view with a large text area input.
  viewStack.pushNewTableView(function(newTableView) {
    newTableView.setSearchBar(new Pushpop.TableViewSearchBar(newTableView));
    newTableView.setDataSource(childDataSource);
    
    newTableView.$bind(Pushpop.TableView.EventType.DidSelectRowAtIndex, function(evt) {
      if (evt.hasChildDataSource) return;
      
      var tableView = evt.tableView;
      var dataSource = tableView.getDataSource();
      var item = dataSource.getFilteredItemAtIndex(evt.index);
      
      self.setValue(item);
      viewStack.pop(view);
    });
  });
}