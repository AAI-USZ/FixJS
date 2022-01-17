function() {
  var tableView = this.tableView;
  
  var viewStack = tableView.getViewStack();
  if (!viewStack) return;
  
  var data = this.getData();
  if (!data) return;
  
  var i, dayDataSource = [], yearDataSource = [];
  for (i = 1; i <= 31; i++) dayDataSource.push({ value: i, title: i + '' });
  for (i = 1970; i <= 2100; i++) yearDataSource.push({ value: i, title: i + '' });
  
  var monthDataSource = [
    { value: 1,  title: 'January'   }, { value: 2,  title: 'February' },
    { value: 3,  title: 'March'     }, { value: 4,  title: 'April'    },
    { value: 5,  title: 'May'       }, { value: 6,  title: 'June'     },
    { value: 7,  title: 'July'      }, { value: 8,  title: 'August'   },
    { value: 9,  title: 'September' }, { value: 10, title: 'October'  },
    { value: 11, title: 'November'  }, { value: 12, title: 'December' }
  ];
  
  var dateParts = this.getValue(), currentDate = new Date();
  if (!dateParts || (typeof dateParts !== 'string')) dateParts = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
  dateParts = dateParts.split('-');
  
  var year = window.parseInt(dateParts[0], 10);
  var month = window.parseInt(dateParts[1], 10);
  var day = window.parseInt(dateParts[2], 10);
  
  year = { value: year, title: year + '' };
  day = { value: day, title: day + '' };
  
  for (i = 0; i < 12; i++) if (monthDataSource[i].value === month) {
    month = monthDataSource[i];
    break;
  }
  
  if (!month || !month.value) month = monthDataSource[0];
  
  var dataSource = new Pushpop.TableViewDataSource([
    {
      reuseIdentifier: 'pp-select-input-table-view-cell',
      title: 'Month',
      name: 'month',
      value: month,
      childDataSource: monthDataSource
    },
    {
      reuseIdentifier: 'pp-select-input-table-view-cell',
      title: 'Day',
      name: 'day',
      value: day,
      childDataSource: dayDataSource
    },
    {
      reuseIdentifier: 'pp-select-input-table-view-cell',
      title: 'Year',
      name: 'year',
      value: year,
      childDataSource: yearDataSource
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
      var year = value.year.value;
      var month = value.month.value;
      var day = value.day.value;
      
      self.setValue(year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day);
      tableView.reloadData();
      viewStack.pop();
    });
    
    var newView = newTableView.getView();
    newView.setTitle($.trim((data && data.title) ? data.title : 'Date'));
    newView.$navbarButtons = $doneButton;
  });
}