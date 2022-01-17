function(chunk) {
            chunk.copy(buf, index, 0, chunk.length)
            index += chunk.length
          }