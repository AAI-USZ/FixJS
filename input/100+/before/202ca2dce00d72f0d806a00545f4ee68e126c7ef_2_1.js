function () {
  var dataset = new recline.Model.Dataset({
    records: [
      {'Date': '2012-03-20', 'title': '1'},
      {'Date': '2012-03-25', 'title': '2'}
    ]
  });
  var view = new recline.View.Timeline({
    model: dataset
  });
  equal(view.state.get('startField'), 'Date');

  var out = view._timelineJSON();
  var exp = {
      'timeline': {
        'type': 'default',
        'headline': '',
        'date': [
          {
            'startDate': new Date('2012-03-20'),
            'endDate': null,
            'headline': '1',
            'text': '<div><strong>Date</strong>: 2012-03-20</div><div><strong>title</strong>: 1</div>'
          },
          {
            'startDate': new Date('2012-03-25'),
            'endDate': null,
            'headline': '2',
            'text': '<div><strong>Date</strong>: 2012-03-25</div><div><strong>title</strong>: 2</div>'
          }
        ]
      }
    };
  deepEqual(out, exp);
}