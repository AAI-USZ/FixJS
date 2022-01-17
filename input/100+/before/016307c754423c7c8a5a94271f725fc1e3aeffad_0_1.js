function(value) {
  
  // Call the "super" method.
  Pushpop.TableViewCell.prototype.setSelected.apply(this, arguments);
  
  if (!value) return;
  
  var tableView = this.tableView;
  
  var viewStack = tableView.getViewStack();
  if (!viewStack) return;
  
  var data = this.getData();
  if (!data) return;
  
  var i, hourDataSource = [], minuteDataSource = [];
  for (i = 0; i <= 23; i++) hourDataSource.push({ value: (i < 10 ? '0' : '') + i, title: (i < 10 ? '0' : '') + i });
  for (i = 0; i <= 59; i++) minuteDataSource.push({ value: (i < 10 ? '0' : '') + i, title: (i < 10 ? '0' : '') + i });
  
  var timeParts = this.getValue(), currentTime = new Date();
  if (!timeParts || (typeof timeParts !== 'string')) timeParts = currentTime.getHours() + ':' + currentDate.getMinutes();
  timeParts = timeParts.split(':');
  
  var hour = window.parseInt(timeParts[0], 10);
  var minute = window.parseInt(timeParts[1], 10);
  
  hour = { value: (hour < 10 ? '0' : '') + hour, title: (hour < 10 ? '0' : '') + hour };
  minute = { value: (minute < 10 ? '0' : '') + minute, title: (minute < 10 ? '0' : '') + minute };
  
  var dataSource = new Pushpop.TableViewDataSource([
    {
      reuseIdentifier: 'pp-select-input-table-view-cell',
      title: 'Hour',
      name: 'hour',
      value: hour,
      childDataSource: hourDataSource
    },
    {
      reuseIdentifier: 'pp-select-input-table-view-cell',
      title: 'Minute',
      name: 'minute',
      value: minute,
      childDataSource: minuteDataSource
    }
  ]);
  
  var self = this;
  
  // Push a new view with a large text area input.
  viewStack.pushNewTableView(function(newTableView) {
    newTableView.setDataSource(dataSource);
    
    var $doneButton = $('<a class="pp-barbutton pp-barbutton-align-right pp-barbutton-style-blue active" href="#">Done</a>');
    
    $doneButton.bind('click', function(evt) {
      evt.preventDefault();
      
      var value = dataSource.getValuesObject();
      var hour = value.hour.value;
      var minute = value.minute.value;
      
      self.setValue(hour + ':' + minute);
      tableView.reloadData();
      viewStack.pop();
    });
    
    var newView = newTableView.getView();
    newView.setTitle($.trim((data && data.title) ? data.title : 'Time'));
    newView.$navbarButtons = $doneButton;
  });
}