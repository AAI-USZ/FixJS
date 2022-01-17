function act_handleEvent(evt) {
    if (evt.type !== 'mozChromeEvent')
      return;

    var detail = evt.detail;
    if (detail.type !== 'activity-choice')
      return;

    this._id = detail.id;

    var choices = detail.choices;
    if (choices.length === 1) {
      this.choose('0');
    } else {
      ListMenu.request(this._listItems(choices),
                       this.choose.bind(this));
    }
  }