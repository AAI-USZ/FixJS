function error (token, idx, type) {
        if (/^error/.test(type)) done( new Error( type + ' should not trigger') )
      }