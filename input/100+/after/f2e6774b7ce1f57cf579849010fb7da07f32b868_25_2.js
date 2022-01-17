function re_cleanup() {
    if (this._recentsDB)
      this._recentsDB.close();
  }