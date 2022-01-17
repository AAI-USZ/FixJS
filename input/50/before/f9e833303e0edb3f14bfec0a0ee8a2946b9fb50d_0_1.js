function(){
      playerView.append("#s3play")
      setTimeout(
        function(){
          self.bind_ui()
          self.play()
        }, 0
      )
      console.log("S3Play loaded songs")
    }