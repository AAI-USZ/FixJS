function(data) {
            if (data.worked) {
              opponent.emit('lose', {})
            }
          }