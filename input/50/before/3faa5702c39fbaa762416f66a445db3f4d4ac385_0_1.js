function(value) {
      if (!value) return this._[prop]

      this._[prop] = value
      return this
    }