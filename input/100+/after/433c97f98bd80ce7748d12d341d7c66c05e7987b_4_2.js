function(options, callbacks) {
  if (options.loadReason != "startup") {ready = true; return;}
  var si = Services.startup.getStartupInfo();
  var interrupted = Services.startup.interrupted;
  _time = si.process;
  _startupTime = si.firstPaint - si.process;

  if (_startupTime >= SLOW_STARTUP_MIN_TIME && !interrupted){
    var worker = new ChromeWorker(data.url("proc-info-worker.js"));
    worker.onmessage = function(event) { logStartup(event.data); };
    worker.postMessage(JSON.stringify(["(p.CPU > 0.05 || p.IOTransferDelta > 512*1024 || " + 
      "p.PageFaultCountDelta > 256 || p.CurrentProcess) && pid != 0", 5000]));
  } else {
    logStartup(null);
  }
}