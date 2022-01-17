function ($audio) {
  var _this = this;
  this.$audio = $audio;

  var _reset = function (index, filename) {
    if (!filename) return;
    this.$audio.data('current', parseInt(index, 10));
    this.$audio.trigger('change:index', $audio.data('current'));
    this.$audio.attr('src', filename);
    this.$audio.trigger('change:src', filename);
    this.setState($audio.data('state') || 'play');
  };

  this.$audio.on('ended', function () {
    _this.fetch(_this.getCurrent() + 1);
  });

  this.setState = function (state) {
    switch (state) {
      case 'play':
        this.getDOMAudio().play();
        break;
      case 'pause':
        this.getDOMAudio().pause();
        break;
    }
    this.$audio.data('state', state);
    this.$audio.trigger('change:state', state);
  };
  this.getState = function () {
    return this.$audio.data('state');
  };
  this.getCurrent = function () {
    return this.$audio.data('current');
  };
  this.fetch = function (index, options) {
    if (index < 0) index = 0;
    $.getJSON('playlist?song=' + index, null, function (data) {
      _reset.call(_this, index, data.result);
      if (!options) return;
      $.isFunction(options.success) && options.success();
    });
  };
  this.getDOMAudio = function () {
    return $audio.get(0);
  };
}