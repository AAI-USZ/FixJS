function(handler){
        delete handlers[id][handler.i]
        element.removeEventListener(handler.e, handler.proxy, false)
      }