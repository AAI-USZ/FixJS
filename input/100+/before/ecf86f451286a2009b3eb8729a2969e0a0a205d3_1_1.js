function(options, onSuccess) {
    API.call('presets', 'get', options).on({success: onSuccess});
  }