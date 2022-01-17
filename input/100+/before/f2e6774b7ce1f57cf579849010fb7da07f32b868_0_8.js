function browser_drawHistoryHeading(threshold,
    timestamp) {
    //TODO: localise
    const LABELS = [
      'Future',
      'Today',
      'Yesterday',
      'Last 7 Days',
      'This Month',
      'Last 6 Months',
      'Older than 6 Months'
    ];

    var text = '';
    var h3 = document.createElement('h3');

    // Special case for month headings
    if (threshold == 5 && timestamp) {
      var date = new Date(timestamp);
      var now = new Date();
      text = DateHelper.MONTHS[date.getMonth()];
      if (date.getFullYear() != now.getFullYear())
        text += ' ' + date.getFullYear();
    } else {
      text = LABELS[threshold];
    }

    var textNode = document.createTextNode(text);
    h3.appendChild(textNode);
    var ul = document.createElement('ul');
    this.history.appendChild(h3);
    this.history.appendChild(ul);
  }