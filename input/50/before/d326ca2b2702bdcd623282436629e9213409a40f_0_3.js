function() {
      return this.bodies
                 .map(function(data) { return data.toString() })
                 .join('')
    }