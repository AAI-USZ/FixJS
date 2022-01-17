function() {
    return this._query || (this._query = qs.parse(this.querystring))
}