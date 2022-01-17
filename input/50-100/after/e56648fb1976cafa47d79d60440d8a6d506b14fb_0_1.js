function(value, attr) {
      var updateAllowed = (
        (readOnlyAttributes.indexOf(attr) == -1) &&
        (readOnlyAttributes.indexOf(Utils._.underscored(attr)) == -1) &&
        (self.attributes.indexOf(attr) > -1)
      )
			if(updateAllowed) {
				if(self[attr] != value) {
					self.__dirty[attr] = {old: self[attr], current: value}
				}
				
				self[attr] = value
			}
    }