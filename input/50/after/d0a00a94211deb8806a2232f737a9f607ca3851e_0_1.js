function (event) {
        var result = callback.apply(element, [createProxy(event)].concat(event.data))
        if (result === false) event.preventDefault()
        return result
      }