function() {
      debug('Socket ' + name + ' event')
      var args = toArray(arguments)
      args.unshift(name)
      self.$emit.apply(self, args)
    }