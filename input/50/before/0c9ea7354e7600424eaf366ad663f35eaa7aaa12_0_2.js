function() {
    setOpacity(1);
    Module.setStatus('');
    BananaBread.execute('screenres ' + screen.width + ' ' + screen.height);
    Module.requestFullScreen();
    Module.resumeMainLoop();
  }