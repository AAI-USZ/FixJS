function(associatedObject) {
      associatedObject[self.__factory.identifier] = self.options.omitNull ? '' : null
      associatedObject.save()
    }