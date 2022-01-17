function (element, options) {
      this.options = $.extend({}, $.fn.draw.defaults, options)
      this.points = []
      this.$parent = $(element).parent()
        .on('mousedown.draw.data-api', '[data-draw=canvas]', $.proxy(this.start, this))
        .on('click', '[data-clear=draw]', $.proxy(this.clear, this))
        .on('click', '[data-color]', $.proxy(this.setColor, this))
        .on('click', '[data-size]', $.proxy(this.setSize, this))
      this.$canvas = $(canvas, this.$parent)
      this.c = this.$canvas.get(0).getContext('2d')
      this.offset = this.$parent.offset()
      this.color = "#000"
      this.size = 1
      this.$recording = $('[data-recording=draw]', this.$parent)
      this.$playback = $('[data-playback=draw]', this.$parent)
      this.$playback.length && this.play(JSON.parse(this.$playback.val()))
    }