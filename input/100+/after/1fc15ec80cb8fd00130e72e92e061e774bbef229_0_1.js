function(msg){

      switch(msg){
        case 'reload':
          self.log.info('Reload Rules');
          self.reloadRedisRules(true);
        break;
        
        case 'start debugger':
          self.tmp_log = self.log;
          self.log = bunyan.createLogger({
            name: self.name,
            src: true,            
            serializers: self.log_serializers,
            streams: [{
              path: self.config.log
            }]
          });
          
          self.log.info('Debugger started!');
        break;
        
        case 'stop debugger':
          if(self.tmp_log){
            self.log.info('Debugger stopped!');
            delete self.log;
            self.log = self.tmp_log;
          }
        break;
        
        case 'purge':
          self.purge();
        break;
        
        default:
          self.log.error({error:'Command "' + msg + '" not found!', source: 'core setRedisConf'});
      }

    }