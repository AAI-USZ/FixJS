function (node) {
        var ret = bonzo(normalize(node)).insertAfter(this)
        this.remove()
        return ret
      }