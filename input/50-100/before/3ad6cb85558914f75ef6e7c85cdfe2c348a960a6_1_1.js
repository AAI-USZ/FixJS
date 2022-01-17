function () {
      var i, l, p, r = []
      for (i = 0, l = this.length; i < l; i++) {
        p = this[i]
        while (p = p.previousSibling) p.nodeType == 1 && r.push(p)
        p = this[i]
        while (p = p.nextSibling) p.nodeType == 1 && r.push(p)
      }
      return $(r)
    }