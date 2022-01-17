function() {

  // 1.1.2
  // migrates the data from the local storage to the background local storage
  // necessary so we can export data + sync it across computers

  function migrateData() {
    try {
      var data = JSON.parse(localStorage['__vrome_setting'] || "{}")
      // add if we don't already have data'
      if (data) {
        !Settings.get('hosts.zoom_level') && data['zoom_level'] && Settings.add('hosts.zoom_level', data['zoom_level']);
        !Settings.get('hosts.local_marks') && data['local_marks'] && Settings.add('hosts.local_marks', data['local_marks']);
        delete localStorage['__vrome_setting']
      }
    } catch (e) {
      c.l(e)
    }
  }

  return {
    exec: migrateData
  };
}