function() {
      var c = this.c
        , $canvas = this.$canvas
      c.clearRect(0, 0, $canvas.width(), $canvas.height())
      this.points = []
      this.updateRecording()
    }