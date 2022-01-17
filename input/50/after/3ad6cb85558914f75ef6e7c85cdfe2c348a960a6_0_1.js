function (node, opt_host) {
        var ret = bonzo(normalize(node)).insertAfter(this, opt_host)
        this.remove()
        Bonzo.call(opt_host || this, ret)
        return opt_host || this
      }