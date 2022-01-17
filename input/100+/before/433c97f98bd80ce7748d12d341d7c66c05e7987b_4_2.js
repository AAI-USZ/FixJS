function(options, callbacks) {
  if (options.loadReason != "startup") {ready = true; return;}
  var si = Services.startup.getStartupInfo();
  _time = si.process;
  _startupTime = si.firstPaint - si.process;

  if (_startupTime >= SLOW_STARTUP_MIN_TIME){
    //console.log("_startupTime >= SLOW_STARTUP_TIME");
    var worker = new ChromeWorker(data.url("proc-info-worker.js"));
    worker.onmessage = function(event) { logStartup(event.data); }
    worker.postMessage(["(p.CPU > 0.05 || p.IOTransferDelta > 512*1024 || " + 
      "p.PageFaultCountDelta > 256 || p.CurrentProcess) && pid != 0", 5000]);
  } else {
    //console.log("_startupTime < SLOW_STARTUP_TIME");
    logStartup(null);
  }
}