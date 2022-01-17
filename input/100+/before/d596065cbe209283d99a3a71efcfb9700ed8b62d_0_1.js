function (index, filename) {
    if (!filename) return;
    $audio.data('current', parseInt(index, 10));
    $audio.trigger('change:index', $audio.data('current'));
    $audio.attr('src', filename);
    $audio.trigger('change:src', filename);
    _setState($audio.data('state') || 'play');
  }