function() {
    return this._query || (this.query = qs.parse(this.querystring))
}