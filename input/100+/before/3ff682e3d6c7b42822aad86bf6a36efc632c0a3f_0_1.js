function() {  // no pun intended
  var _state;
  function load() {
    _state = $.jStorage.get('uslicenseplates', {});
  }
  function save() {
    $.jStorage.set('uslicenseplates', _state);
  }
  return {
     load: load,
      save: save,
      add: function(name) {
        _state[name] = new Date();
        save();
      },
      remove: function(name) {
        delete _state[name];
        save();
      },
      iterate: function(callback) {
        $.each(_state, function(name, date) {
          callback(name, date);
        });
      }
  }
}