function() { 
  readUUID();

  SDL.defaults.copyOnLock = false;
  var save_path = 'http://play-ttd.com/save/' + Module['UUID'] + '/';

  FS.createPath('/', 'home/caiiiycuk/play-ttd/etc/preload/save', true, true);
  FS.createPreloadedFile('/home/caiiiycuk/play-ttd/etc/preload/save', 'saved_on_server.sav', 
    save_path + 'saved_on_server.sav', true, true);
}