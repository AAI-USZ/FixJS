function(value, attr) {
      if(!self.hasOwnProperty(attr)) {
        self.addAttribute(attr, Utils.toDefaultValue(value))
      }
    }