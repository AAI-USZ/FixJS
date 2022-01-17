function(action, key, value) {
    var updates = this.AttributeUpdates || (this.AttributeUpdates = {})

    if (updates[key]) {
      throw new Error("Attribute '" + key + "' cannot be updated more than once.")
    }

    updates[key] = {Action: action}

    if (value != null) updates[key].Value = Value(value)

    return this
  }