function (element, options) {
      this.options = $.extend({}, $.fn.draw.defaults, options)
      this.points = []
      this.$element = $(element).parent()
        .on('mousedown.draw.data-api', '[data-draw="canvas"]', $.proxy(this.start, this))
        .on('click', '[data-clear="draw"]', $.proxy(this.clear, this))
        .on('click', '[data-color]', $.proxy(this.setColor, this))
        .on('click', '[data-size]', $.proxy(this.setSize, this))
        .on('change', '[data-playback]', $.proxy(this.playback, this))
      this.$canvas = $(canvas, this.$element)
      this.c = this.$canvas.get(0).getContext('2d')
      this.offset = this.$element.offset()
      this.color = "#000"
      this.size = 1
    }