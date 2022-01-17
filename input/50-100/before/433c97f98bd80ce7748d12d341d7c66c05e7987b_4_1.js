function logStartup(data){
  if(ss.storage.h.length >= MAX_LOG_ENTRIES)
    ss.storage.h.shift();
  ss.storage.h.push({
    'time': _time, 'startupTime': _startupTime, 'data': data
  });
  if (lastWorker) lastWorker.postMessage(ss.storage.h);
  ready = true;
}