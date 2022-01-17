function findFavorites(callback) {
    var options = {
      filterBy: ['category'],
      filterOp: 'contains',
      filterValue: 'Favorites',
      sortBy: 'familyName',
      sortOrder: 'ascending'
    };

    this._findMany(options, callback);
  }