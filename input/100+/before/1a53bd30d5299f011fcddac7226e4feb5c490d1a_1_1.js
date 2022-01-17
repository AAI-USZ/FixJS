function(worker) {
        fM.factPages.push(worker);
        worker.on('detach', function() {
          return fM.detachWorker(this);
        });
        worker.port.on('getFact', function() {
          return worker.postMessage({
            fact: fM.getFact()
          });
        });
        worker.port.on('getEnabled', function() {
          return worker.postMessage({
            isEnabled: fM.isEnabled
          });
        });
        return worker.postMessage({
          css: data.load('css/jquery.noty.css') + data.load('css/noty_theme_facebook.css') + data.load('css/content.css')
        });
      }