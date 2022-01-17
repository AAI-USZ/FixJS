function findByID(contactID, callback) {
    var options = {
      filterBy: ['id'],
      filterOp: 'equals',
      filterValue: contactID
    };

    this._findOne(options, callback);
  }