function(emitter, oldAssociations, newAssociations) {
    var self    = this
      , options = this.__factory.options

    // clear the old associations
    oldAssociations.forEach(function(associatedObject) {
      associatedObject[self.__factory.identifier] = options.omitNull ? '' : null
      associatedObject.save()
    })

    // set the new one
    var chainer = new Utils.QueryChainer()

    newAssociations.forEach(function(associatedObject) {
      associatedObject[self.__factory.identifier] = self.instance.id
      chainer.add(associatedObject.save())
    })

    chainer
      .run()
      .success(function() { emitter.emit('success', newAssociations) })
      .error(function(err) { emitter.emit('error', err) })
  }