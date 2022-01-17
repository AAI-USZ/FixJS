function(stream) {
      console.log('Streaming Tweets with filter "%s"...', settings.stream)
      activeStream = stream

      stream.on('data', onStreamedTweet)

      stream.on('error', function(err) {
        console.error('Error from Tweet stream: %s', err)
        fallback()
      })

      stream.on('destroy', function(data) {
        console.log('Stream destroyed: %s', data)
        fallback()
      })
    }