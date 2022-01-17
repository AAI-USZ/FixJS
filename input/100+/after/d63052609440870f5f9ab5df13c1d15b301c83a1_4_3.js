function(xhr, l) {  
  this.worker.postMessage({buffer : xhr.response, level : l},
                          [xhr.response]);
 }