function(date, uid) {
    // NB: unlike oldest known, this should not actually be impacted by messages
    // found by search.
    if (!this._headerBlockInfos.length)
      return (date === null && uid === null);

    var blockInfo = this._headerBlockInfos[0];
    return (date === blockInfo.endTS &&
            uid === blockInfo.endUID);
  }