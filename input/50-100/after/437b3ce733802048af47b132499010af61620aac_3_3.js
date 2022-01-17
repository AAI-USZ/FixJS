function() {
    if (!this._headerBlockInfos.length)
      return 0;
    return this._headerBlockInfos[0].endTS;
  }