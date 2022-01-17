function ( DebuggerLogAssembly) {
       var globalClock = {p_id: 0};
       DebuggerLogAssembly.initialize(globalClock);
       
       DebuggerLogAssembly.connect(chrome.devtools.protocol);

       function detach() {
         console.log("detach?");
       }

       window.addEventListener('unload', detach, false);
  }