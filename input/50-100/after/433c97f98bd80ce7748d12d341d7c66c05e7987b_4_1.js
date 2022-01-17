function logStartup(data){
  if(ss.storage.h.length >= MAX_LOG_ENTRIES)
    ss.storage.h.shift();
  var log = {'time': _time, 'startupTime': _startupTime, 'data': data};
  ss.storage.h.push(log);
  if (lastWorker) lastWorker.postMessage(JSON.stringify(ss.storage.h));
  ready = true;
}