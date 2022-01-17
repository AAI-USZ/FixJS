function() { 
  SDL.defaults.copyOnLock = false;

  FS.createPath('/', 'home/caiiiycuk/play-ttd/etc/preload/save', true, true);
  FS.createPreloadedFile(
  	'/home/caiiiycuk/play-ttd/etc/preload/save', 
  	'perfomacne_test.sav', 
  	'http://play-ttd.com/save/perfomance_test.sav', true, true);
}