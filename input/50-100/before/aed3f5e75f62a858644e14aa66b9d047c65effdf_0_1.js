function () { 
                          var ret = 'apps';
                          var fh=ini.get('feedhenry'); 
                          if (fh && fh !== '') {                            
                            var dom_start = fh.indexOf(':') + 3;
                            var dom_end = fh.indexOf('.');
                            ret = fh.substring(dom_start, dom_end);
                          }
                          return ret;
                      }