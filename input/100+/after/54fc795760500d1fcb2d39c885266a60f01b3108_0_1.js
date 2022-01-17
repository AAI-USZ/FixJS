function() {  
  var tableView = this.tableView;
  var viewStack = tableView.getViewStack();
  if (!viewStack) return;
  
  var data = this.getData();
  if (!data) return;
  
  var title = data.title || '';
  var name = data.name || '';
  var value = data.value || '';
  
  var self = this;
  
  // Push a new view with a large text area input.
  viewStack.pushNewView(function(newView) {
    var $textarea = $('<textarea class="pp-text-area-input-table-view-cell-textarea" name="' + name + '">' + value + '</textarea>');
    var $doneButton = $('<a class="pp-barbutton pp-barbutton-align-right pp-barbutton-style-blue active" href="#">Done</a>');
    
    $doneButton.bind('click', function(evt) {
      evt.preventDefault();
      
      self.setValue($textarea.val());
      tableView.reloadData();
      viewStack.pop();
    });
    
    newView.setTitle(title);
    newView.$navbarButtons = $doneButton;
    newView.$element.append($textarea);
  });
}