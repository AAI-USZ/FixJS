function ($) {

  "use strict"; // jshint ;_;

// must refactor this: 
// http://jsfiddle.net/dh3bj/

 /* DRAW PUBLIC CLASS DEFINITION
  * ============================== */

  var canvas = '[data-draw="canvas"]'
    , clear = '[data-draw="clear"]'
    , Draw = function (element, options) {
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

  Draw.prototype = {
    constructor: Draw

    , start: function(e) {
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

    , stop: function(e) {
      e && e.preventDefault()

      this.$canvas
        .off('mouseup.draw.data-api', $.proxy(this.stop, this))
        .off('mouseout.draw.data-api', $.proxy(this.stop, this))
        .off('mousemove.draw.data-api', $.proxy(this.move, this))
    }

    , move: function(e) {
      e && e.preventDefault()

      var x = e.offsetX
        , y = e.offsetY

      this.addLine(x, y)
      this.drawLine(x, y)
    }

    , drawPoint: function(x, y) {
      var c = this.c
      c.beginPath()
      c.moveTo(x, y)
    }

    , drawLine: function(x, y) {
      var c = this.c   
      c.strokeStyle = this.color
      c.lineWidth = this.size
      c.lineTo(x, y)
      c.stroke()
    }

    , addPoint: function(x, y) {
      this.points.push({ x: x, y: y, t: new Date().getTime(), isPoint: true, color: this.color, size: this.size })
      this.updateRecording()
    }

    , addLine: function(x, y) {
      this.points.push({ x: x, y: y, t: new Date().getTime(), isPoint: false, color: this.color, size: this.size })
      this.updateRecording()
    }

    , clear: function() {
      var c = this.c
        , $canvas = this.$canvas
      c.clearRect(0, 0, $canvas.width(), $canvas.height())
      this.points = []
      this.updateRecording()
    }

    , updateRecording: function() {
      this.$recording.length && this.$recording.val(JSON.stringify(this.points));
    }

    , setColor: function(color) {
      if (typeof color == 'string')
        return this.color = color

      var $t = $(color.currentTarget)
      this.color = $t.data('color')
      return true;
    }

    , setSize: function(size) {
      if (typeof size == 'string')
        return this.size = size

      var $t = $(size.currentTarget)
      this.size = $t.data('size')
      return true;
    }

    , play: function(data) {
      !data && (data = this.points)

      var c = this.c
        , i;
      for (i = 0; i < data.length; i++) {
        var pt = data[i]
          , x = pt.x
          , y = pt.y
          , t = pt.t
          , p = pt.isPoint
          , co = pt.color
          , s = pt.size

          if (p) {        
            c.beginPath()
            c.moveTo(x, y)
          } else {
            c.strokeStyle = co
            c.lineWidth = s
            c.lineTo(x, y)
            c.stroke()
          }
      }
    }
  } 

 /* DRAW PLUGIN DEFINITION
  * ======================== */

  $.fn.draw = function (option) {
    return this.each(function () {
      var $this = $(this)
        , options = $.extend({}, $.fn.draw.defaults, typeof option == 'object' && option)
      $this.data('draw', (new Draw(this, options)))
    })
  }

  $.fn.draw.defaults = {}

  $.fn.draw.Constructor = Draw

 /* BUTTON DATA-API
  * =============== */

  $(document).ready(function(){
    $('[data-draw=canvas]').draw();
  })

}