function(value) {
      if (!arguments.length) return this._[prop]

      this._[prop] = value
      return this
    }