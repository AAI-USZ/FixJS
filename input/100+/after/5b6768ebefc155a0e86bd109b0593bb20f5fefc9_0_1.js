function($, _, Component, VerticalSlider) {

  var Knob = VerticalSlider.extend({

    options: _.extend({
      rotate: 120
    }, VerticalSlider.prototype.options),

    template: '<div class="bb-gui-component">' +
      '<div class="round slider">' +
        '<div class="track">' +
          '<div class="grip"></div>' +
        '</div>' +
      '</div>' +
    '</div>',

    setVal: function(val) {

      var rotate_range = this.options.rotate * 2,
        val_range = this.options.max - this.options.min,
        ratio = (val - this.options.min) / val_range,
        rotation = (rotate_range * ratio) - this.options.rotate;

      this.$grip.css('-webkit-transform', 'rotate(' + rotation + 'deg)');

    },

    setElement: function($el) {
      this.$grip = $('.grip', $el);
      Component.prototype.setElement.apply(this, arguments);
    },

  });

  return Knob;

}