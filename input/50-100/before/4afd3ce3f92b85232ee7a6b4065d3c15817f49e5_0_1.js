function(path) {
    if (!this.importCache[path]) {
      var defineCall = require(path)
      this.importCache[path] = defineCall(this, DataTypes)
    }

    return this.importCache[path]
  }