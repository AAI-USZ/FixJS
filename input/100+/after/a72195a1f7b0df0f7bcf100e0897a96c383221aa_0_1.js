function(query, searchType, callback) {
    if(typeof searchType === 'function') { // allow searchType to be optional and have a default value
      callback = searchType;
      searchType = 'and';
    }

    if(searchType !== 'or') searchType = 'and';

    callback = (typeof callback === 'function') ? callback : function() {}; // make sure we don't have a null callback

    var qWords;

    switch(keyType) {
      case 'metaphone':
        qWords = stemmer.metaphoneString(query);
        break;

      case 'stem':
        qWords = stemmer.stemString(query);
        break;

      case 'plain':
        qWords = stemmer.keywordString(query);
        break;
    }

    switch(searchType) {
      case 'or':
        return mongoose.Model.find.call(this, { _keywords: { $all: qWords } }, callback);
        break;

      case 'and':
        return mongoose.Model.find.call(this, { _keywords: { $in: qWords } }, callback);
        break;

      default:
        throw new Error('Error: Invalid search type');
    }
  }