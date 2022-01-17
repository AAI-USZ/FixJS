function(e) {
      e && e.preventDefault()

      if (this.$canvas.data('enabled') == false) 
          return false

      this.$canvas
        .on('mouseup.draw.data-api', $.proxy(this.stop, this))
        .on('mouseout.draw.data-api', $.proxy(this.stop, this))
        .on('mousemove.draw.data-api', $.proxy(this.move, this))

      var x = e.offsetX
        , y = e.offsetY
        
      this.addPoint(x, y)
      this.drawPoint(x, y, 1)
    }