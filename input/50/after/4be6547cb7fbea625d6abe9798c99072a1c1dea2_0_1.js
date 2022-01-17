function(associatedObject) {
      associatedObject[self.__factory.identifier] = options.omitNull ? '' : null
      associatedObject.save()
    }